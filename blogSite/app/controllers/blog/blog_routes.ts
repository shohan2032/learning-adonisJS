import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const BlogController = () => import('./blog_controller.js')

router
  .group(() => {
    router.post('/create-blog', [BlogController, 'createBlog']).middleware(middleware.auth())
    router.get('/all-blogs', [BlogController, 'getAllBlog'])
  })
  .prefix('api/blog')
