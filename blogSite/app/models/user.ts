import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Blog from './blog.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Favorite from './favorite.js'
import Like from './like.js'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import RememberMeToken from './remember_me.js'

// To prevent the timing attacks
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'], //finding a user by a UID(username) and verifying their password before marking them as logged in.
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  serializeExtras = true

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)
  // Relationships
  @hasMany(() => Blog, {
    foreignKey: 'author_id',
    localKey: 'id',
  })
  declare blogs: HasMany<typeof Blog>

  @hasMany(() => Favorite, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  declare favorites: HasMany<typeof Favorite>

  @hasMany(() => Like, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  declare likes: HasMany<typeof Like>

  @hasMany(() => RememberMeToken, {
    foreignKey: 'tokenableId',
    localKey: 'id',
  })
  declare rememberMeTokens: HasMany<typeof RememberMeToken>
}
