import router from '@adonisjs/core/services/router'

const ReactionController = () => import('./reaction_controller.js')

router
  .group(() => {
    router.post('/create-reaction', [ReactionController, 'createReaction'])
    router.post('/delete-reaction', [ReactionController, 'deleteReaction'])
  })
  .prefix('/reaction')
