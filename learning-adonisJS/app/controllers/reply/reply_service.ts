import ReplyQuery from './reply_query.js'

export default class ReplyService {
  private replyQuery: ReplyQuery
  constructor() {
    this.replyQuery = new ReplyQuery()
  }

  async createReply(data: { comment_id: number; user_id: number; content: string }) {
    return await this.replyQuery.CreateReply(data)
  }

  async getRepliesByCommentId(comment_id: number) {
    // console.log(comment_id)
    return await this.replyQuery.GetRepliesByCommentId(comment_id)
  }
  async deleteReply(data: { id: number; user_id: number }) {
    const reply = await this.replyQuery.GetReplyByReplyId(data.id)
    if (!reply) {
      throw new Error('Reply not found')
    }
    if (reply?.user_id !== data.user_id) {
      throw new Error('Unauthorized to delete this reply')
    }
    return await this.replyQuery.DeleteReply(data.id)
  }
  async updateReply(data: { id: number; user_id: number; content: string }) {
    const reply = await this.replyQuery.GetReplyByReplyId(data.id)
    if (!reply) {
      throw new Error('Reply not found')
    }
    if (reply?.user_id !== data.user_id) {
      throw new Error('Unauthorized to update this reply')
    }
    return await this.replyQuery.UpdateReply(data.id, data.content)
  }
}
