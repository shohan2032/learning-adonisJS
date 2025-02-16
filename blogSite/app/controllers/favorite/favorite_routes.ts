import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const FavoriteController = () => import('./favorite_controller.js')

router
  .group(() => {
    router.post('/add-favorite', [FavoriteController, 'addFavorite'])
    router.post('/remove-favorite', [FavoriteController, 'removeFavorite'])
    router.get('/has-favorite', [FavoriteController, 'getHasFavorite'])
  })
  .prefix('api/favorite')
  .middleware(middleware.auth())
