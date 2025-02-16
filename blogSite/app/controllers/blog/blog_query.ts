import Blog from '#models/blog'

export default class BlogQuery {
  public async createBlog(
    title: string,
    author_id: number,
    author_name: string,
    content: string,
    is_private: boolean,
    image_url: string,
    estimate_reading_time: number
  ) {
    return await Blog.create({
      title,
      author_id,
      author_name,
      content,
      is_private,
      image_url,
      estimate_reading_time,
    })
  }
  public async getAllBlog() {
    return await Blog.query().where('is_private', false).orderBy('created_at', 'desc')
  }

  public async getFilteredBlogs(searchTerm: string) {
    const searchQuery = `%${searchTerm}%`
    return await Blog.query()
      .where('is_private', false)
      .where('title', 'like', searchQuery)
      .orWhere('content', 'like', searchQuery)
      .orderBy('created_at', 'desc')
  }

  public async getBlogsByUserId(userId: number) {
    return await Blog.query().where('author_id', userId).orderBy('created_at', 'desc')
  }

  public async getBlogByBlogId(blogId: number) {
    return await Blog.query().where('id', blogId).first()
  }

  public async deleteBlog(id: number) {
    const blog = await Blog.findOrFail(id)
    return await blog.delete()
  }

  public async updateBlog(
    id: number,
    title: string,
    content: string,
    is_private: boolean,
    estimate_reading_time: number
  ) {
    const blog = await Blog.findOrFail(id)
    blog.title = title
    blog.content = content
    blog.estimate_reading_time = estimate_reading_time
    blog.is_private = is_private
    await blog.save()
    return blog
  }
  public async incrementLikeCount(blogId: number) {
    const blog = await Blog.findOrFail(blogId)
    blog.like_count++
    await blog.save()
  }
  public async decrementLikeCount(blogId: number) {
    const blog = await Blog.findOrFail(blogId)
    blog.like_count--
    await blog.save()
  }
  public async getAllFavoritesByUserId(userId: number) {
    const favoriteBlogs = await Blog.query()
      .whereHas('favorites', (query) => {
        query.where('user_id', userId)
      })
      .preload('favorites', (favQuery) => {
        favQuery.where('user_id', userId)
      })
      .orderBy('created_at', 'desc')

    console.log(favoriteBlogs)
    return favoriteBlogs
  }
  public async getLastTenLikedBlogsByUserId(userId: number) {
    const blogs = await Blog.query()
      .whereHas('likes', (query) => {
        query.where('user_id', userId)
      })
      .preload('likes', (likeQuery) => {
        likeQuery.where('user_id', userId)
      })
      .orderBy('created_at', 'desc')
      .limit(10)
    return blogs
  }
}
