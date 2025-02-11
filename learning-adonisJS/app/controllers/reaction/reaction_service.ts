import { Exception } from '@adonisjs/core/exceptions'
import ReactionQuery from './reaction_query.js'

export default class ReactionService {
  private reactionQuery: ReactionQuery
  constructor() {
    this.reactionQuery = new ReactionQuery()
  }
  async createReaction(
    user_id: number,
    entity_id: number,
    entity_type: 'post' | 'comment' | 'reply',
    reaction_type: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'
  ) {
    const reaction = await this.reactionQuery.createReaction(
      user_id,
      entity_id,
      entity_type,
      reaction_type
    )
    return reaction
  }
  async deleteReaction(id: number, user_id: number) {
    const reaction = await this.reactionQuery.getReactionByReactionId(id)
    if (!reaction) {
      throw new Exception('Reaction not found')
    }
    if (reaction.user_id !== user_id) {
      throw new Exception('Unauthorized to delete this reaction')
    }
    await this.reactionQuery.deleteReactionByReactionId(id)
    return { messages: 'Deleted reaction' }
  }
}
