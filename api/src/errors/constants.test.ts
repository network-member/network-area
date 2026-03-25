import { StatusCodes } from 'http-status-codes'

import { ApiError, BadRequestApiError, UnauthorizedApiError } from './constants.js'

describe('ApiError', () => {
  it('sets the correct status code', () => {
    const error = new ApiError(StatusCodes.NOT_FOUND)
    expect(error.statusCode).toBe(StatusCodes.NOT_FOUND)
  })

  it('uses the HTTP reason phrase as the default message', () => {
    const error = new ApiError(StatusCodes.NOT_FOUND)
    expect(error.message).toBe('Not Found')
  })

  it('uses a custom message when provided', () => {
    const error = new ApiError(StatusCodes.NOT_FOUND, 'Resource not found')
    expect(error.message).toBe('Resource not found')
  })

  it('is an instance of Error', () => {
    const error = new ApiError(StatusCodes.BAD_REQUEST)
    expect(error).toBeInstanceOf(Error)
  })
})

describe('BadRequestApiError', () => {
  it('has BAD_REQUEST status code', () => {
    const error = new BadRequestApiError()
    expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST)
  })

  it('uses the default HTTP reason phrase when no message is provided', () => {
    const error = new BadRequestApiError()
    expect(error.message).toBe('Bad Request')
  })

  it('uses a custom message when provided', () => {
    const error = new BadRequestApiError('Invalid input')
    expect(error.message).toBe('Invalid input')
  })

  it('is an instance of ApiError', () => {
    const error = new BadRequestApiError()
    expect(error).toBeInstanceOf(ApiError)
  })
})

describe('UnauthorizedApiError', () => {
  it('has UNAUTHORIZED status code', () => {
    const error = new UnauthorizedApiError()
    expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED)
  })

  it('uses the default HTTP reason phrase when no message is provided', () => {
    const error = new UnauthorizedApiError()
    expect(error.message).toBe('Unauthorized')
  })

  it('uses a custom message when provided', () => {
    const error = new UnauthorizedApiError('Token expired')
    expect(error.message).toBe('Token expired')
  })

  it('is an instance of ApiError', () => {
    const error = new UnauthorizedApiError()
    expect(error).toBeInstanceOf(ApiError)
  })
})
