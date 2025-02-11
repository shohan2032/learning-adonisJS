import Reaction from '#models/reaction'

export default class ReactionQuery {
  public async createReaction(
    user_id: number,
    entity_id: number,
    entity_type: 'post' | 'comment' | 'reply',
    reaction_type: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'
  ) {
    const reaction = await Reaction.create({
      user_id,
      entity_id,
      entity_type,
      reaction_type,
    })
    return reaction
  }
  public async getReactionByReactionId(id: number) {
    const reaction = await Reaction.findOrFail(id)
    return reaction
  }

  public async deleteReactionByReactionId(id: number) {
    const reaction = await Reaction.findOrFail(id)
    await reaction.delete()
  }
}
