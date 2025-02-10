import Comment from '#models/comment'

export default class CommentQuery {
  public async CreateComment(data: { post_id: number; user_id: number; content: string }) {
    return await Comment.create(data)
  }
  public async GetCommentByCommentId(comment_id: number) {
    return await Comment.findBy('id', comment_id)
  }
  public async UpdateComment(data: { id: number; user_id: number; content: string }) {
    const comment = await Comment.findOrFail(data.id)
    comment.content = data.content
    await comment.save()
    return comment
  }

  public async DeleteComment(data: { id: number; user_id: number }) {
    const comment = await Comment.findOrFail(data.id)
    await comment.delete()
    return { message: 'Comment deleted successfully' }
  }

  public async GetCommentsByPostId(post_id: number) {
    // return await Comment.query().where('post_id', post_id)
    const comments = await Comment.query()
      .select('id', 'user_id')
      .where('post_id', post_id)
      .preload('user', (query) => {
        query.select('id', 'username')
      })
      .withCount('reactions', (query) => {
        query.where('entity_type', 'comment')
      })
      .where('post_id', post_id)

    return comments
  }
}
