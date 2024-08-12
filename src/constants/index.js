import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const ACCESS_TOKEN_TTL = 15 * 60 * 1000; 
export const REFRESH_TOKEN_TTL = 24 * 60 * 60 * 1000; 

export const Template_Dir = path.resolve("src", "templates");