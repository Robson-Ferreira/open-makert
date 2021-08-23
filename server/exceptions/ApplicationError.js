import l from '../common/Logger';

export default class ApplicationError extends Error {
  constructor(
    message = 'Ocorreu um erro. Tente novamente mais tarde.',
    status = 500,
    code = null,
    request = null,
    logLevel = 'info',
  ) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.code = code;
    l[logLevel](request, message);
  }
}
