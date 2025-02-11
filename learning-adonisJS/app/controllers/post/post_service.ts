import { Exception } from '@adonisjs/core/exceptions'
import PostQuery from './post_query.js'

export default class PostService {
  private postQuery: PostQuery
  constructor() {
    this.postQuery = new PostQuery()
  }
  async createPost(data: { user_id: number; content: string }) {
    return await this.postQuery.CreatePost(data)
  }
  async getAllPosts() {
    return await this.postQuery.GetAllPosts()
  }

  async getPostsWithStats() {
    return await this.postQuery.GetPostsWithStats()
  }

  async getPostsByUserId(userId: number) {
    return await this.postQuery.GetPostsByUserId(userId)
  }

  async updatePost(data: { id: number; user_id: number; content: string }) {
    const post = await this.postQuery.GetPostByPostId(data.id)
    if (!post) {
      throw new Exception('Post not found')
    }
    if (post?.user_id !== data.user_id) {
      throw new Exception('Unauthorized to update this post')
    }
    return await this.postQuery.UpdatePost(data.id, data.content)
  }

  async deletePost(data: { id: number }) {
    const post = await this.postQuery.GetPostByPostId(data.id)
    if (!post) {
      throw new Exception('Post not found')
    }
    return await this.postQuery.DeletePost(data)
  }
}
