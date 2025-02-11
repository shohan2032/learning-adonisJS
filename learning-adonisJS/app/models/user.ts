import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Post from './post.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'
import Reply from './reply.js'
import Reaction from './reaction.js'

// const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
//   uids: ['email'],
//   passwordColumnName: 'password',
// })

export default class User extends BaseModel {
  serializeExtras = true
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string | null

  @column()
  declare email: string

  @column({ serializeAs: null }) // Password (hidden from API responses)
  declare password: string

  // Relationships

  // one to many relationship
  // 🔗 One user can have many posts.
  // posts.user_id refers to users.id
  @hasMany(() => Post, {
    foreignKey: 'user_id',
  })
  declare posts: HasMany<typeof Post>

  // 🔗 One user can write many comments.
  // comments.user_id refers to users.id
  @hasMany(() => Comment, {
    foreignKey: 'user_id',
  })
  declare comments: HasMany<typeof Comment>

  // 🔗 One user can post many replies.
  // replies.user_id refers to users.id
  @hasMany(() => Reply, {
    foreignKey: 'user_id',
  })
  declare replies: HasMany<typeof Reply>

  // �� One user can react to many entities.
  // reactions.user_id refers to users.id
  @hasMany(() => Reaction, {
    foreignKey: 'user_id',
  })
  declare reactions: HasMany<typeof Reaction>
}
