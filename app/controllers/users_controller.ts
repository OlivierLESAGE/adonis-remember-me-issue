// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async me({ auth }: HttpContext) {
    return auth.user
  }
}

