import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Reaction extends BaseModel {
  static get table() {
    return 'reactions'
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare entity_type: 'post' | 'comment' | 'reply'

  @column()
  declare entity_id: number

  @column()
  declare reaction_type: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
