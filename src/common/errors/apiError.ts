export class ApiError extends Error {
  message: string = 'Internal api error';
  code: number = 0;
  statusCode: number = 400;

  constructor(message: string, code?: number, statusCode?: number) {
    super(message);

    this.name = 'ApiError';

    if (typeof code === 'number') {
      this.code = code;
    }

    if (typeof statusCode === 'number') {
      this.statusCode = statusCode;
    }
  }
}
