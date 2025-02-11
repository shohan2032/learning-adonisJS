import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Reaction from './reaction.js'
import Comment from './comment.js'
import User from './user.js'

export default class Post extends BaseModel {
  serializeExtras = true
  @column({ isPrimary: true })
  declare id: number

  // Foreign key referring to users.id (shows which user created the post)
  @column()
  declare user_id: number

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Relationships

  // 🔗 Each post belongs to one user.
  // posts.user_id refers to users.id
  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  declare user: BelongsTo<typeof User>

  // 🔗 A post can have many reactions.
  // reactions.entity_id refers to posts.id
  @hasMany(() => Reaction, {
    localKey: 'id',
    foreignKey: 'entity_id',
  })
  declare reactions: HasMany<typeof Reaction>

  // 🔗 A post can have many comments.
  // comments.post_id refers to posts.id
  @hasMany(() => Comment, {
    localKey: 'id',
    foreignKey: 'post_id',
  })
  declare comments: HasMany<typeof Comment>
}
