import { HttpContext } from '@adonisjs/core/http'
import {
  GetPostsByUserIdValidator,
  CreatePostValidator,
  UpdatePostValidator,
  DeletePostValidator,
} from './post_validator.js'
import PostService from './post_service.js'
export default class PostController {
  private postService: PostService
  constructor() {
    this.postService = new PostService()
  }

  public async createPost({ request, response }: HttpContext) {
    // console.log(request.body())
    // console.log(request.all())
    request.all().user_id = request.param('userId')
    const payload = await request.validateUsing(CreatePostValidator)
    const post = await this.postService.createPost(payload)
    return response.send(post)
  }
  public async updatePost({ request, response }: HttpContext) {
    console.log(request.qs())
    request.all().id = request.param('id')
    const payload = await request.validateUsing(UpdatePostValidator)
    const post = await this.postService.updatePost(payload)
    return response.send(post)
  }
  public async deletePost({ request, response }: HttpContext) {
    request.all().id = request.param('id')
    const payload = await request.validateUsing(DeletePostValidator)
    await this.postService.deletePost(payload)
    return response.send({ message: 'Post deleted successfully' })
  }
  public async allPost(ctx: HttpContext) {
    // const payload = await ctx.request.validateUsing(PostValidator)
    const posts = await this.postService.getAllPosts()
    return ctx.response.send(posts)
  }

  public async userPosts({ request, response }: HttpContext) {
    request.all().userId = request.param('userId')
    const payload = await request.validateUsing(GetPostsByUserIdValidator)
    const posts = await this.postService.getPostsByUserId(payload.userId)
    return response.send(posts)
  }
}
