import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const BlogController = () => import('./blog_controller.js')

router
  .group(() => {
    router.post('/create-blog', [BlogController, 'createBlog']).middleware(middleware.auth())
    router.get('/all-blogs', [BlogController, 'getAllBlog'])
    router.get('/filtered-blogs', [BlogController, 'getFilteredBlogs'])
    router.get('/blogs-by-user', [BlogController, 'getBlogsByUserId']).middleware(middleware.auth())
    router
      .post('/delete-blog', [BlogController, 'deleteBlogByBlogId'])
      .middleware(middleware.auth())
    router.post('edit-blog', [BlogController, 'editBlogByBlogId']).middleware(middleware.auth())
    router.get('/blog-by-id', [BlogController, 'getBlogByBlogId'])
  })
  .prefix('api/blog')
