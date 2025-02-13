import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Favorite from './favorite.js'
import Like from './like.js'

export default class Blog extends BaseModel {
  seralizeExtras = true
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare author_id: number

  @column()
  declare content: string

  @column()
  declare like_count: number

  @column()
  declare is_private: boolean

  @column()
  declare image_url: string

  @column()
  declare estimate_reading_time: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => User, {
    foreignKey: 'author_id',
    localKey: 'id',
  })
  declare author: BelongsTo<typeof User>

  @hasMany(() => Favorite, {
    foreignKey: 'blog_id',
    localKey: 'id',
  })
  declare favorites: HasMany<typeof Favorite>

  @hasMany(() => Like, {
    foreignKey: 'blog_id',
    localKey: 'id',
  })
  declare likes: HasMany<typeof Like>
}
