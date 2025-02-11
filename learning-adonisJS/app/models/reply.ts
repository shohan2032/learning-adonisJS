import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'
import Reaction from './reaction.js'

export default class Reply extends BaseModel {
  serializeExtras = true
  @column({ isPrimary: true })
  declare id: number

  // Foreign key linking the reply to a specific comment.
  @column()
  declare comment_id: number

  // Foreign key linking the reply to the user who made it.
  @column()
  declare user_id: number

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Relationships

  // 🔗 Each reply belongs to one user.
  // replies.user_id refers to users.id
  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  declare user: BelongsTo<typeof User>

  // 🔗 Each reply belongs to one comment.
  // replies.comment_id refers to comments.id
  @belongsTo(() => Comment, {
    foreignKey: 'comment_id',
    localKey: 'id',
  })
  declare comment: BelongsTo<typeof Comment>

  // 🔗 A reply can have many reactions (like, love, etc.).
  // reactions.entity_id refers to replies.id
  @hasMany(() => Reaction, {
    localKey: 'id',
    foreignKey: 'entity_id',
  })
  declare reactions: HasMany<typeof Reaction>
}
