import PostQuery from './post_query.js'

export default class PostService {
  private postQuery: PostQuery
  constructor() {
    this.postQuery = new PostQuery()
  }
  async getAllPosts() {
    return await this.postQuery.GetAllPosts()
  }
}
