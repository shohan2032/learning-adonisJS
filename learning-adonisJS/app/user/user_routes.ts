import router from '@adonisjs/core/services/router'

const UserController = () => import('./user_controller.js')

router
  .group(() => {
    router.post('api/login', [UserController, 'login'])
    router.post('api/logout', [UserController, 'logout'])
  })
  .prefix('/user-auth')
