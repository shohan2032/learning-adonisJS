import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Post from './post.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'
import Reply from './reply.js'
import Reaction from './reaction.js'

// const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
//   uids: ['email'],
//   passwordColumnName: 'password',
// })

export default class User extends BaseModel {
  serializeExtras = true
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @hasMany(() => Post, {
    foreignKey: 'user_id',
  })
  declare posts: HasMany<typeof Post>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @hasMany(() => Reply)
  declare replies: HasMany<typeof Reply>

  @hasMany(() => Reaction)
  declare reactions: HasMany<typeof Reaction>
}
