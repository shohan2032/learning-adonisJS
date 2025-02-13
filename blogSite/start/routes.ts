/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import '../app/controllers/auth/auth_routes.js'
import '../app/controllers/blog/blog_routes.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
