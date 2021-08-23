import ApplicationError from './ApplicationError';

export default class NotFoundError extends ApplicationError {
  constructor(request, message) {
    super(message, 404, request, 'warn');
  }
}
