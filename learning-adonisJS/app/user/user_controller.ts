import { HttpContext } from '@adonisjs/core/http'
import { LoginValidator, RegisterValidator } from './user_validator.js'
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
    await ctx.auth.use('web').logout()
    return ctx.response.send({ message: 'Logged out successfully' })
  }
  public async register({ request, response }: HttpContext) {
    console.log(request.body())
    // Implement registration logic here
    const payload = await request.validateUsing(RegisterValidator)
    const newUser = await this.userService.register(payload)
    return response.send(newUser)
  }
}
