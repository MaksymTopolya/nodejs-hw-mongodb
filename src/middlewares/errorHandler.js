import { isHttpError } from 'http-errors';

function errorHandler(error, _req, res, _next) {
  if (isHttpError(error) === true) {
    return res.status(error.status).send({
      status: error.status,
      message: 'Route not found',
    });
  }

  res.status(500).send({
    status: 500,
    message: 'Something went wrong',
    data: error
  });
}

export { errorHandler };
