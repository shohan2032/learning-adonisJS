import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const LikeController = () => import('./like_controller.js')

router
  .group(() => {
    router.post('/add-like', [LikeController, 'addLike'])
    router.post('/remove-like', [LikeController, 'removeLike'])
    router.get('/has-liked', [LikeController, 'getHasLiked'])
  })
  .prefix('api/like')
  .middleware(middleware.auth())
