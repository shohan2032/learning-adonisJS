import Blog from '#models/blog'

export default class BlogQuery {
  public async createBlog(
    title: string,
    author_id: number,
    content: string,
    like_count: number,
    is_private: boolean,
    image_url: string,
    estimate_reading_time: number
  ) {
    return await Blog.create({
      title,
      author_id,
      content,
      like_count,
      is_private,
      image_url,
      estimate_reading_time,
    })
  }
  public async getAllBlog() {
    return await Blog.all()
  }
}
