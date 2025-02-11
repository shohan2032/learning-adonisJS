import router from '@adonisjs/core/services/router'

const ReplyController = () => import('./reply_controller.js')

router
  .group(() => {
    router.get('/all-replies/:commentId', [ReplyController, 'getRepliesByCommentId'])
    router.post('/create-reply', [ReplyController, 'createReply'])
    router.post('/delete-reply', [ReplyController, 'deleteReply'])
    router.post('/update-reply', [ReplyController, 'updateReply'])
  })
  .prefix('reply')
