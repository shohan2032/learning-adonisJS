import router from '@adonisjs/core/services/router'

const CommentController = () => import('./comment_controller.js')

router
  .group(() => {
    router.post('/api/create-comment/post/:postId/user/:userId', [
      CommentController,
      'createComment',
    ])
    router.post('/api/update-comment/comment/:commentId/user/:userId', [
      CommentController,
      'updateComment',
    ])
  })
  .prefix('comment')
