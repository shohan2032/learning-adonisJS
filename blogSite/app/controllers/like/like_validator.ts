import vine from '@vinejs/vine'

export const AddLikeValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    blog_id: vine.number(),
  })
)

export const RemoveLikeValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    blog_id: vine.number(),
  })
)
export const GetHasLikedValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    blog_id: vine.number(),
  })
)
