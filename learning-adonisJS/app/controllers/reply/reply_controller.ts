import {
  CreateReplyValidator,
  GetRepliesByCommentIdValidator,
  DeleteReplyValidator,
  UpdateReplyValidator,
} from './reply_validator.js'
import ReplyService from './reply_service.js'
import { HttpContext } from '@adonisjs/core/http'

export default class ReplyController {
  private replyService: ReplyService
  constructor() {
    this.replyService = new ReplyService()
  }
  public async createReply({ response, request }: HttpContext) {
    const payload = await request.validateUsing(CreateReplyValidator)
    const reply = await this.replyService.createReply(payload)
    return response.send(reply)
  }

  public async getRepliesByCommentId({ response, request }: HttpContext) {
    // request.all().comment_id = request.param('commentId')
    const payload = await request.validateUsing(GetRepliesByCommentIdValidator)
    const replies = await this.replyService.getRepliesByCommentId(payload.commentId)
    return response.send(replies)
  }

  public async deleteReply({ response, request }: HttpContext) {
    const payload = await request.validateUsing(DeleteReplyValidator)
    await this.replyService.deleteReply(payload)
    return response.send({ message: 'Reply deleted successfully' })
  }

  public async updateReply({ response, request }: HttpContext) {
    const payload = await request.validateUsing(UpdateReplyValidator)
    const reply = await this.replyService.updateReply(payload)
    return response.send(reply)
  }
}
