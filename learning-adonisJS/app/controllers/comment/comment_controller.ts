import { HttpContext } from '@adonisjs/core/http'
import {
  CreateCommentValidator,
  UpdateCommentValidator,
  DeleteCommentValidator,
  AllCommentsByPostIdValidator,
} from './comment_validator.js'
import CommentService from './comment_service.js'
export default class CommentController {
  private commentService: CommentService
  constructor() {
    this.commentService = new CommentService()
  }
  public async allCommentsByPostId({ response, request }: HttpContext) {
    // request.all().post_id = request.param('postId')
    const payload = await request.validateUsing(AllCommentsByPostIdValidator)
    const comments = await this.commentService.allCommentsByPostId(payload)
    return response.send(comments)
  }
  public async createComment({ response, request }: HttpContext) {
    request.all().post_id = request.body().postId
    request.all().user_id = request.body().userId
    const payload = await request.validateUsing(CreateCommentValidator)
    const comment = await this.commentService.createComment(payload)
    return response.send(comment)
  }

  public async updateComment({ response, request }: HttpContext) {
    request.all().id = request.body().commentId
    request.all().user_id = request.body().userId
    const payload = await request.validateUsing(UpdateCommentValidator)
    const comment = await this.commentService.updateComment(payload)
    return response.send(comment)
  }

  public async deleteComment({ response, request }: HttpContext) {
    request.all().id = request.body().commentId
    request.all().user_id = request.body().userId
    const payload = await request.validateUsing(DeleteCommentValidator)
    await this.commentService.deleteComment(payload)
    return response.send({ message: 'Comment deleted successfully' })
  }
}
