import { HttpContext } from '@adonisjs/core/http'
import { LoginValidator } from './user_validator.js'
import Userservice from './user_service.js'
export default class UserController {
  private userService: Userservice
  constructor() {
    this.userService = new Userservice()
  }
  public async login(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(LoginValidator)

    return this.userService.login(payload)
  }

  public async logout(ctx: HttpContext) {
    await ctx.auth.logout()
    return ctx.response.send({ message: 'Logged out successfully' })
  }
}
