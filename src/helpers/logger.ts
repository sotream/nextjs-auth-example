// Core
import * as logger from 'log4js';

export const createLogger = process.env.NODE_ENV === 'development'
  ?  (label: string, logLevel = 'debug') => {
    const log = logger.getLogger(`DEV [${label}]`);

    log.level = logLevel;

    return log;
  }
  :  (label: string, logLevel = 'debug') => {
    const log = logger.getLogger(label);

    log.level = logLevel;

    return log;
  };
