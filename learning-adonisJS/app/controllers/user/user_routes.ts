import router from '@adonisjs/core/services/router'

const UserController = () => import('./user_controller.js')

router
  .group(() => {
    router.post('api/login', [UserController, 'login'])
    router.post('api/logout', [UserController, 'logout'])
    router.post('api/register', [UserController, 'register'])
    router.get('api/users-with-most-post-count', [UserController, 'usersWithMostPostCount'])
  })
  .prefix('/user-auth')
