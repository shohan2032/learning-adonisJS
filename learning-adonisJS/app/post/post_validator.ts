import vine from '@vinejs/vine'

export const PostValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)
