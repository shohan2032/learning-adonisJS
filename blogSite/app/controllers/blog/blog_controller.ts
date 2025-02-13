import BlogService from './blog_service.js'
import { CreateBlogValidator } from './blog_validator.js'
import { HttpContext } from '@adonisjs/core/http'

export default class BlogController {
  private blogService: BlogService
  constructor() {
    this.blogService = new BlogService()
  }
  public async createBlog(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(CreateBlogValidator)
    return this.blogService.createBlog(payload)
  }
  public async getAllBlog(ctx: HttpContext) {
    const blogs = await this.blogService.getAllBlog()
    console.log(blogs)
    return ctx.response.send(blogs)
  }
}
