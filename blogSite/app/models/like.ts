import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Blog from './blog.js'

export default class Like extends BaseModel {
  serializeExtras = true
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare blog_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Relationships
  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Blog, {
    foreignKey: 'blog_id',
    localKey: 'id',
  })
  declare blog: BelongsTo<typeof Blog>
}
