import { StatusCodes, getReasonPhrase } from 'http-status-codes'

export class ApiError extends Error {
  constructor(
    readonly statusCode: StatusCodes,
    customMessage?: string,
  ) {
    super(customMessage !== undefined && customMessage !== '' ? customMessage : getReasonPhrase(statusCode))
  }
}

export class BadRequestApiError extends ApiError {
  constructor(message?: string) {
    super(StatusCodes.BAD_REQUEST, message)
  }
}

export class UnauthorizedApiError extends ApiError {
  constructor(message?: string) {
    super(StatusCodes.UNAUTHORIZED, message)
  }
}
