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

  @column()
  declare user_id: number | null

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  declare user: BelongsTo<typeof User>

  @hasMany(() => Reaction, {
    foreignKey: 'entity_id',
    // onQuery: (query) => query.where('entity_type', 'post'),
  })
  declare reactions: HasMany<typeof Reaction>

  @hasMany(() => Comment, {
    localKey: 'id',
    foreignKey: 'post_id',
  })
  declare comments: HasMany<typeof Comment>
}
