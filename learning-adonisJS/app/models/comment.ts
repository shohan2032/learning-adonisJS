import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Post from './post.js'
import Reply from './reply.js'
import Reaction from './reaction.js'

export default class Comment extends BaseModel {
  serializeExtras = true
  @column({ isPrimary: true })
  declare id: number

  // Foreign key linking the comment to a post
  @column()
  declare post_id: number

  @column()
  declare user_id: number

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Relationships
  // 🔗 Each comment belongs to one user.
  // comments.user_id refers to users.id
  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  declare user: BelongsTo<typeof User>

  // 🔗 Each comment belongs to one post.
  // comments.post_id refers to posts.id
  @belongsTo(() => Post, {
    foreignKey: 'post_id',
    localKey: 'id',
  })
  declare post: BelongsTo<typeof Post>

  // 🔗 A comment can have many replies.
  // replies.comment_id refers to comments.id
  @hasMany(() => Reply, {
    localKey: 'id',
    foreignKey: 'comment_id',
  })
  declare replies: HasMany<typeof Reply>

  // 🔗 A comment can have many reactions.
  // reactions.entity_id refers to comments.id
  @hasMany(() => Reaction, {
    foreignKey: 'entity_id',
  })
  declare reactions: HasMany<typeof Reaction>
}
