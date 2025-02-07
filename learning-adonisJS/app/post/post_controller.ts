import { HttpContext } from '@adonisjs/core/http'
import { PostValidator } from './post_validator.js'
import 
export default class PostController {
  private postService: PostService
  constructor() {
    this.postService = new PostService()
  }
  public async allPost(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(PostValidator)

    return this.postService.login(payload)
  }


}
