import vine from '@vinejs/vine'

export const CreateCommentValidator = vine.compile(
  vine.object({
    post_id: vine.number(),
    user_id: vine.number(),
    content: vine.string().trim(),
  })
)

export const UpdateCommentValidator = vine.compile(
  vine.object({
    id: vine.number(),
    user_id: vine.number(),
    content: vine.string().trim(),
  })
)
