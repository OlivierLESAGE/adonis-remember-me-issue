/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.post('register', [AuthController, 'register']).use(middleware.guest())
    router.post('login', [AuthController, 'login']).use(middleware.guest())
    router.get('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('auth')

router
  .group(() => {
    router.get('me', [UsersController, 'me'])
  })
  .prefix('users')
  .use(middleware.auth())
