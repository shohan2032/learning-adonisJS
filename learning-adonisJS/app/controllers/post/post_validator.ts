import vine from '@vinejs/vine'

export const GetPostsByUserIdValidator = vine.compile(
  vine.object({
    userId: vine.number(),
  })
)

export const CreatePostValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    content: vine.string().minLength(5).maxLength(200),
  })
)

export const UpdatePostValidator = vine.compile(
  vine.object({
    id: vine.number(),
    content: vine.string().minLength(5).maxLength(200),
  })
)

export const DeletePostValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)
