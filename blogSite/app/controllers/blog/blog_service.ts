import BlogQuery from './blog_query.js'

export default class BlogService {
  private blogQuery: BlogQuery
  constructor() {
    this.blogQuery = new BlogQuery()
  }
  async createBlog(data: {
    title: string
    author_id: number
    author_name: string
    content: string
    is_private: boolean
    image_url: string
    estimate_reading_time: number
  }) {
    return await this.blogQuery.createBlog(
      data.title,
      data.author_id,
      data.author_name,
      data.content,
      data.is_private,
      data.image_url,
      data.estimate_reading_time
    )
  }
  async getAllBlog() {
    return await this.blogQuery.getAllBlog()
  }
  async getFilteredBlogs(searchTerm: string) {
    return await this.blogQuery.getFilteredBlogs(searchTerm)
  }

  async getBlogsByUserId(userId: number) {
    return await this.blogQuery.getBlogsByUserId(userId)
  }
  async getBlogByBlogId(blogId: number) {
    return await this.blogQuery.getBlogByBlogId(blogId)
  }
  async deleteBlog(blogId: number) {
    return await this.blogQuery.deleteBlog(blogId)
  }
  async updateBlog(
    blogId: number,
    title: string,
    content: string,
    is_private: boolean,
    estimate_reading_time: number
  ) {
    return await this.blogQuery.updateBlog(
      blogId,
      title,
      content,
      is_private,
      estimate_reading_time
    )
  }
  async incrementLikeCount(blogId: number) {
    await this.blogQuery.incrementLikeCount(blogId)
  }
  async decrementLikeCount(blogId: number) {
    await this.blogQuery.decrementLikeCount(blogId)
  }
  async getAllFavoritesByUserId(user_id: number) {
    return await this.blogQuery.getAllFavoritesByUserId(user_id)
  }
  async getLastTenLikedBlogsByUserId(user_id: number) {
    return await this.blogQuery.getLastTenLikedBlogsByUserId(user_id)
  }
}
