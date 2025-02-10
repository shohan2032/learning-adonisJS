// import { Exception } from '@adonisjs/core/exceptions'
import { Exception } from '@adonisjs/core/exceptions'
import CommentQuery from './comment_query.js'

export default class CommentService {
  private commentQuery: CommentQuery
  constructor() {
    this.commentQuery = new CommentQuery()
  }
  async createComment(data: { post_id: number; user_id: number; content: string }) {
    return await this.commentQuery.CreateComment(data)
  }
  async updateComment(data: { id: number; user_id: number; content: string }) {
    const comment = await this.commentQuery.GetCommentByCommentId(data.id)
    if (!comment) {
      throw new Exception('Comment not found')
    }
    if (comment?.user_id !== data.user_id) {
      throw new Exception('Unauthorized to update this comment')
    }
    return await this.commentQuery.UpdateComment(data)
  }

  async deleteComment(data: { id: number; user_id: number }) {
    const comment = await this.commentQuery.GetCommentByCommentId(data.id)
    if (!comment) {
      throw new Exception('Comment not found')
    }
    if (comment?.user_id !== data.user_id) {
      throw new Exception('Unauthorized to delete this comment')
    }
    return await this.commentQuery.DeleteComment(data)
  }

  async allCommentsByPostId(data: { post_id: number }) {
    return await this.commentQuery.GetCommentsByPostId(data.post_id)
  }
}
