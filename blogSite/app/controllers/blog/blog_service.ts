import BlogQuery from './blog_query.js'

export default class BlogService {
  private blogQuery: BlogQuery
  constructor() {
    this.blogQuery = new BlogQuery()
  }
  async createBlog(data: {
    title: string
    author_id: number
    content: string
    like_count: number
    is_private: boolean
    image_url: string
    estimate_reading_time: number
  }) {
    return await this.blogQuery.createBlog(
      data.title,
      data.author_id,
      data.content,
      data.like_count,
      data.is_private,
      data.image_url,
      data.estimate_reading_time
    )
  }
  async getAllBlog() {
    return await this.blogQuery.getAllBlog()
  }
}
