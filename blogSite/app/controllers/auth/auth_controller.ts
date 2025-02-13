import { LoginValidator, RegisterValidator } from './auth_validator.js'
import AuthService from './auth_service.js'
import { HttpContext } from '@adonisjs/core/http'
// import { Exception } from '@adonisjs/core/exceptions'

export default class AuthController {
  private userService: AuthService
  constructor() {
    this.userService = new AuthService()
  }
  public async register({ response, request }: HttpContext) {
    const payload = await request.validateUsing(RegisterValidator)
    const user = await this.userService.registerUser(payload)
    return response.send(user)
  }
  public async login({ auth, request }: HttpContext) {
    const payload = await request.validateUsing(LoginValidator)
    const user = await this.userService.login(payload)
    await auth.use('web').login(user)
    return auth.use('web').user
  }
  public async isLoggedIn({ auth }: HttpContext) {
    // const user = auth.use('web').user
    const user = auth.getUserOrFail()
    return user
  }
  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    // return response.redirect('/login')
    return response.send({ message: 'Logged out successfully' })
  }
}
