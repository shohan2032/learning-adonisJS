import router from '@adonisjs/core/services/router'

const PostController = () => import('./post_controller.js')

router
  .group(() => {
    router.get('api/all-posts', [PostController, 'allPost'])
    router.get('api/posts-with-stats', [PostController, 'postsWithStats'])
    router.get('api/user/:userId/posts', [PostController, 'userPosts'])
    router.post('api/user/:userId/create-post', [PostController, 'createPost'])
    router.post('api/posts/update-post', [PostController, 'updatePost'])
    router.post('api/posts/:id/delete-post', [PostController, 'deletePost'])
  })
  .prefix('/post')
