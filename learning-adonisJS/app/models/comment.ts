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

  @column()
  declare post_id: number

  @column()
  declare user_id: number

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Post)
  declare post: BelongsTo<typeof Post>

  @hasMany(() => Reply)
  declare replies: HasMany<typeof Reply>

  @hasMany(() => Reaction, {
    foreignKey: 'entity_id',
    // onQuery: (query) => query.where('entity_type', 'comment')
  })
  declare reactions: HasMany<typeof Reaction>
}
