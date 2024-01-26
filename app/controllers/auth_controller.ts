import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import { HttpContext } from '@adonisjs/core/http'
import validator from 'validator'

export default class AuthController {
  async register({ request, auth }: HttpContext) {
    const data = request.all()
    const payload = await registerValidator.validate(data)

    const normalizeEmail = validator.normalizeEmail(payload.email) || payload.email

    await User.create({
      emailNormalized: normalizeEmail,
      email: payload.email,
      password: payload.password,
    })

    const user = await User.verifyCredentials(normalizeEmail, payload.password)
    await auth.use('web').login(user)

    return user
  }

  async login({ request, auth }: HttpContext) {
    const data = request.all()
    const payload = await loginValidator.validate(data)

    const normalizeEmail = validator.normalizeEmail(payload.email) || payload.email

    const user = await User.verifyCredentials(normalizeEmail, payload.password)
    await auth.use('web').login(user)

    return user
  }

  async logout({ auth }: HttpContext) {
    await auth.use('web').logout()
  }
}
