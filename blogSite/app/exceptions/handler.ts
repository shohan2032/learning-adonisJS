import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: any, ctx: HttpContext) {
    if (error.code === 'E_INVALID_CREDENTIALS') {
      return ctx.response.status(401).json({
        message: error.message || 'Invalid credentials. Please try again.',
      })
    }

    if (error.code === 'E_USER_NOT_FOUND') {
      return ctx.response.status(404).json({
        message: error.message || 'User not found. Please check your details.',
      })
    }

    if (error.code === 'E_USER_ALREADY_EXIST') {
      return ctx.response.status(409).json({
        message: error.message || 'User already exists. Please choose a different username.',
      })
    }

    // For other errors, delegate to the parent handler
    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
