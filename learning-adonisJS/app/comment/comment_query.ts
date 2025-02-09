import Comment from '#models/comment'

export default class CommentQuery {
  public async CreateComment(data: { post_id: number; user_id: number; content: string }) {
    return await Comment.create(data)
  }
  public async GetCommentByCommentId(comment_id: number) {
    return await Comment.findBy('id', comment_id)
  }
  public async UpdateComment(data: { id: number; user_id: number; content: string }) {
    const comment = await Comment.findBy('id', data.id)
    if (comment) {
      comment.content = data.content
      await comment.save()
      return comment
    }
  }
}
