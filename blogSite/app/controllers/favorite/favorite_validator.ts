import vine from '@vinejs/vine'

export const AddFavoriteValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    blog_id: vine.number(),
  })
)

export const RemoveFavoriteValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    blog_id: vine.number(),
  })
)
export const GetHasFavoriteValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    blog_id: vine.number(),
  })
)
