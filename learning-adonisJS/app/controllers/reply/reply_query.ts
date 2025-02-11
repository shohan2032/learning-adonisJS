import Reply from '#models/reply'

export default class ReplyQuery {
  public async CreateReply(data: { comment_id: number; user_id: number; content: string }) {
    return await Reply.create(data)
  }
  public async DeleteReply(id: number) {
    const reply = await Reply.findOrFail(id)
    await reply.delete()
  }
  public async UpdateReply(id: number, content: string) {
    const reply = await Reply.findOrFail(id)
    reply.content = content
    await reply.save()
    return reply
  }
  public async GetReplyByReplyId(reply_id: number) {
    return await Reply.query().where('id', reply_id).first()
  }
  public async GetRepliesByCommentId(comment_id: number) {
    return await Reply.query()
      .where('comment_id', comment_id)
      //   .preload('reactions', (query) => {
      //     query.preload('user', (userQuery) => {
      //       userQuery.select('username')
      //     })
      //   })
      .withCount('reactions', (query) => {
        query.where('entity_type', 'reply').as('total_reactions')
      })
  }
}
