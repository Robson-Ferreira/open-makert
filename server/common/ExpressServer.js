/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import * as path from 'path';
import * as http from 'http';
import * as os from 'os';
import * as bodyParser from 'body-parser';

import i18n from 'i18n';

import Express from 'express';
import errorHandler from '../api/middlewares/ErrorHandler';
import l from './Logger';

const app = new Express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      }),
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));

    i18n.configure({
      locales: ['pt'],
      directory: `${root}/locales`,
      defaultLocale: 'pt',
      autoReload: true,
      queryParameter: 'lang',
    });

    app.use(i18n.init);
  }

  router(routes) {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port = process.env.APP_PORT) {
    const welcome = (p) => () => {
      l.info(
        i18n.__('server.welcome', {
          env: process.env.NODE_ENV,
          host: os.hostname(),
          port: p,
        }),
      );
    };
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
