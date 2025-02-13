import vine from '@vinejs/vine'

export const CreateBlogValidator = vine.compile(
  vine.object({
    title: vine.string(),
    author_id: vine.number(),
    content: vine.string(),
    like_count: vine.number(),
    is_private: vine.boolean(),
    image_url: vine.string(),
    estimate_reading_time: vine.number(),
  })
)
