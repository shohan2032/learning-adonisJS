import router from '@adonisjs/core/services/router'

const CommentController = () => import('./comment_controller.js')

router
  .group(() => {
    // Get all comments of a particular post by post_id
    router.get('/api/all-comments/post/:postId', [CommentController, 'allCommentsByPostId'])
    // Create a comment for a particular post by post_id and user_id
    router.post('/api/create-comment/post/:postId/user/:userId', [
      CommentController,
      'createComment',
    ])
    // Update a comment for a particular post by comment_id and user_id
    router.post('/api/update-comment/comment/:commentId/user/:userId', [
      CommentController,
      'updateComment',
    ])
    // Delete a comment for a particular post by comment_id and user_id
    router.post('/api/delete-comment/comment/:commentId/user/:userId', [
      CommentController,
      'deleteComment',
    ])
  })
  .prefix('comment')
