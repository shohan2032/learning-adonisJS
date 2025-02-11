import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Reaction extends BaseModel {
  serializeExtras = true
  @column({ isPrimary: true })
  declare id: number

  // Foreign key linking the reaction to the user who reacted.
  @column()
  declare user_id: number

  @column()
  declare entity_type: 'post' | 'comment' | 'reply'

  // Foreign key linking the reaction to the specific entity (post, comment, reply).
  @column()
  declare entity_id: number

  @column()
  declare reaction_type: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Relationships

  // 🔗 Each reaction belongs to one user (the person who reacted).
  // reactions.user_id refers to users.id
  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  declare user: BelongsTo<typeof User>
}
