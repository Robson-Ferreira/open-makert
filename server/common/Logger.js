/* eslint-disable import/no-cycle */
import pino from 'pino';
import enviroment from '../../config/enviroment';

const logger = pino({
  level: enviroment.logLevel,
  prettyPrint: {
    levelFirst: true,
    colorize: true,
  },
});

export default logger;
