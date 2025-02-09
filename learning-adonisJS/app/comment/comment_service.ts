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
    console.log(comment)
    if (comment?.user_id !== data.user_id) {
      throw new Exception('Unauthorized to update this comment')
    }
    // return comment
    // if (comment.user) {
    //   throw new Exception('Comment not found')
    // }
    return await this.commentQuery.UpdateComment(data)
  }
}
