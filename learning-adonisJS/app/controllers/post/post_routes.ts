import router from '@adonisjs/core/services/router'

const PostController = () => import('./post_controller.js')

router
  .group(() => {
    router.get('/all-posts', [PostController, 'allPost'])
    router.get('/posts-with-stats', [PostController, 'postsWithStats'])
    router.get('/user/posts', [PostController, 'userPosts'])
    router.post('/create-post', [PostController, 'createPost'])
    router.post('/update-post', [PostController, 'updatePost'])
    router.post('/delete-post', [PostController, 'deletePost'])
  })
  .prefix('post')
