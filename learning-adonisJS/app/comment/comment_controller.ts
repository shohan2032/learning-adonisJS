import { HttpContext } from '@adonisjs/core/http'
import { CreateCommentValidator, UpdateCommentValidator } from './comment_validator.js'
import CommentService from './comment_service.js'
export default class CommentController {
  private commentService: CommentService
  constructor() {
    this.commentService = new CommentService()
  }
  public async createComment({ response, request }: HttpContext) {
    request.all().post_id = request.param('postId')
    request.all().user_id = request.param('userId')
    const payload = await request.validateUsing(CreateCommentValidator)
    const comment = await this.commentService.createComment(payload)
    return response.send(comment)
  }

  public async updateComment({ response, request }: HttpContext) {
    request.all().id = request.param('commentId')
    request.all().user_id = request.param('userId')
    const payload = await request.validateUsing(UpdateCommentValidator)
    const comment = await this.commentService.updateComment(payload)
    return response.send(comment)
  }
}
