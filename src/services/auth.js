import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from "../db/models/user.js";
import { Session } from '../db/models/session.js';
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, Template_Dir } from '../constants/index.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/sendMail.js';
import handlebars from 'handlebars';
import path from "node:path";
import fs from "node:fs/promises";


async function registerUser(user) {
  const maybeUser = await User.findOne({ email: user.email });

  if (maybeUser !== null) {
    throw createHttpError(409, 'Email already in use');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return User.create(user);
}

async function loginUser(email, password) {
  const maybeUser = await User.findOne({ email });

  if (maybeUser === null) {
    throw createHttpError(404, 'User not found');
  }

  const isMatch = await bcrypt.compare(password, maybeUser.password);
  
  if (isMatch === false) {
    throw createHttpError(401, 'Unauthorize');
  }

  await Session.deleteOne({ userId: maybeUser._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');


  return Session.create({
    userId: maybeUser._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
}

function logoutUser(sessionId) {
  return Session.deleteOne({ _id: sessionId });
}

async function refreshUserSession(sessionId, refreshToken) {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (session === null) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, 'Refresh token is expired');
  }

  await Session.deleteOne({ _id: session._id });

  return Session.create({
    userId: session.userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
}

async function requestResetEmail(email) {
  const user = await User.findOne({ email });

   if (user === null) {
    throw createHttpError(404, 'User not found');
  }

  const token = jwt.sign({
    sub: user._id,
    email: user.email,
  }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const template = path.join(Template_Dir, "reset-password-email.html");
    const source = await fs.readFile(template, { encoding: "utf-8" });

  const compile = handlebars.compile(source);

  const html = compile({
    name: user.name,
    link: `https://myproject/reset-password?token=${token}`
  });
    
  try {
    await sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Reset your email",
      html
    });
  } catch (error) {
    throw createHttpError(500, 'Failed to send the email, please try again later.');
  }
}


async function resetPwd(password, token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    const user = await User.findOne({ _id: decoded.sub, email: decoded.email });

    if (user === null) {
      throw createHttpError(404, 'User not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      throw createHttpError(401, 'Token not valid');
    }

    throw error;
  }
}



export {
    registerUser,
    loginUser, logoutUser, refreshUserSession, requestResetEmail, resetPwd
};