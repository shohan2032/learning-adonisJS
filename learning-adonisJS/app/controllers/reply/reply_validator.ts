import vine from '@vinejs/vine'

export const CreateReplyValidator = vine.compile(
  vine.object({
    comment_id: vine.number(),
    user_id: vine.number(),
    content: vine.string().trim(),
  })
)

export const GetRepliesByCommentIdValidator = vine.compile(
  vine.object({
    comment_id: vine.number(),
  })
)

export const DeleteReplyValidator = vine.compile(
  vine.object({
    id: vine.number(),
    user_id: vine.number(),
  })
)

export const UpdateReplyValidator = vine.compile(
  vine.object({
    id: vine.number(),
    user_id: vine.number(),
    content: vine.string().trim(),
  })
)
