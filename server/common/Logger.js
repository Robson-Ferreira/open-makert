import { enviroment } from '../../config/enviroment';
import pino from 'pino';

const logger = pino({
  level: enviroment.logLevel,
  prettyPrint: {
    levelFirst: true,
    colorize: true,
  },
});

export default logger;
