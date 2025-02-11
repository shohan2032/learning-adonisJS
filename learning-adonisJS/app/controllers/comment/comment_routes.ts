import router from '@adonisjs/core/services/router'

const CommentController = () => import('./comment_controller.js')

router
  .group(() => {
    // Get all comments of a particular post by post_id
    router.get('/all-comments/:postId', [CommentController, 'allCommentsByPostId'])

    // Create a comment for a particular post by post_id and user_id
    router.post('/create-comment', [CommentController, 'createComment'])

    // Update a comment for a particular post by comment_id and user_id
    router.post('/update-comment', [CommentController, 'updateComment'])

    // Delete a comment for a particular post by comment_id and user_id
    router.post('/delete-comment', [CommentController, 'deleteComment'])
  })
  .prefix('comment')
