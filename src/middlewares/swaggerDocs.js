import * as fs from 'node:fs';
import path from 'node:path';
import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';



export function swaggerDocs() {
  try {
    const SWAGGER_PATH = path.resolve('docs', 'swagger.json');
    const doc = JSON.parse(
      fs.readFileSync(SWAGGER_PATH, { encoding: 'utf-8' }),
    );

    console.log(doc);

    return [...swaggerUI.serve, swaggerUI.setup(doc)];
  } catch (err) {
    console.log(err);
    return (req, res, next) => {
      next(createHttpError(500, 'Can not load swagger docs'));
    };
  }
}
