import ApplicationError from './ApplicationError';

export default class NotFoundError extends ApplicationError {
  constructor(message, statusCode) {
    super(message, statusCode || 400, 'warn');
  }
}
