import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'
import Reaction from './reaction.js'

export default class Reply extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare comment_id: number

  @column()
  declare user_id: number

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Comment)
  declare comment: BelongsTo<typeof Comment>

  @hasMany(() => Reaction, {
    onQuery: (query) => query.where('entity_type', 'reply'),
  })
  declare reactions: HasMany<typeof Reaction>
}
