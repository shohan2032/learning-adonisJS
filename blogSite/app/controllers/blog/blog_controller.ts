import BlogService from './blog_service.js'
import {
  CreateBlogValidator,
  FilterBlogValidator,
  GetBlogsByUserIdValidator,
  DeleteBlogValidator,
  UpdateBlogValidator,
  GetBlogByBlogIdValidator,
} from './blog_validator.js'
import { HttpContext } from '@adonisjs/core/http'

export default class BlogController {
  private blogService: BlogService
  constructor() {
    this.blogService = new BlogService()
  }
  public async createBlog({ response, request }: HttpContext) {
    try {
      const payload = await request.validateUsing(CreateBlogValidator)
      console.log('🚀 ~ BlogController ~ createBlog ~ payload:', payload)
      const blog = await this.blogService.createBlog(payload)
      // console.log('🚀 ~ BlogController ~ createBlog ~ blog:', blog)
      return response.status(201).send(blog)
    } catch (err) {
      return response.internalServerError({
        message: 'Failed to create blog',
        error: err.message,
      })
    }
  }
  public async getAllBlog({ response }: HttpContext) {
    try {
      const blogs = await this.blogService.getAllBlog()
      return response.ok(blogs)
    } catch (err) {
      return response.internalServerError({
        message: 'Failed to fetch all blogs',
        error: err.message,
      })
    }
  }
  public async getFilteredBlogs({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(FilterBlogValidator)
      // console.log(payload.searchTerm)
      const blogs = await this.blogService.getFilteredBlogs(payload.searchTerm)
      return response.ok(blogs)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch filtered blogs',
        error: error.message,
      })
    }
  }
  public async getBlogsByUserId({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(GetBlogsByUserIdValidator)
      const blogs = await this.blogService.getBlogsByUserId(payload.userId)
      return response.ok(blogs)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch blogs!',
        error: error.message,
      })
    }
  }
  public async deleteBlogByBlogId({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(DeleteBlogValidator)
      const blog = await this.blogService.getBlogByBlogId(payload.blogId)
      if (!blog) {
        return response.notFound({ message: 'Blog not found' })
      }
      if (blog.author_id !== payload.authorId) {
        return response.forbidden({ message: 'Unauthorized to delete blog' })
      }
      await this.blogService.deleteBlog(payload.blogId)
      return response.ok({ message: 'Blog deleted successfully' })
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to delete blog!',
        error: error.message,
      })
    }
  }

  public async editBlogByBlogId({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(UpdateBlogValidator)
      const blog = await this.blogService.getBlogByBlogId(payload.blog_id)
      if (!blog) {
        return response.notFound({ message: 'Blog not found' })
      }
      if (blog.author_id !== payload.author_id) {
        return response.forbidden({ message: 'Unauthorized to update blog' })
      }
      await this.blogService.updateBlog(
        payload.blog_id,
        payload.title,
        payload.content,
        payload.is_private,
        payload.estimate_reading_time
      )
      return response.ok({ message: 'Blog updated successfully' })
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to update blog!',
        error: error.message,
      })
    }
  }

  public async getBlogByBlogId({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(GetBlogByBlogIdValidator)
      const blog = await this.blogService.getBlogByBlogId(payload.blogId)
      if (!blog) {
        return response.notFound({ message: 'Blog not found' })
      }
      return response.ok(blog)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to update blog!',
        error: error.message,
      })
    }
  }
}
