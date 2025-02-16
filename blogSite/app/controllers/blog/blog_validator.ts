import vine from '@vinejs/vine'

export const UpdateBlogValidator = vine.compile(
  vine.object({
    blog_id: vine.number(),
    title: vine.string(),
    author_id: vine.number(),
    content: vine.string(),
    is_private: vine.boolean(),
    estimate_reading_time: vine.number(),
  })
)

export const CreateBlogValidator = vine.compile(
  vine.object({
    title: vine.string(),
    author_id: vine.number(),
    author_name: vine.string(),
    content: vine.string(),
    is_private: vine.boolean(),
    image_url: vine.string(),
    estimate_reading_time: vine.number(),
  })
)

export const FilterBlogValidator = vine.compile(
  vine.object({
    searchTerm: vine.string().trim(),
  })
)

export const GetBlogsByUserIdValidator = vine.compile(
  vine.object({
    userId: vine.number(),
  })
)

export const GetBlogByBlogIdValidator = vine.compile(
  vine.object({
    blogId: vine.number(),
  })
)

export const DeleteBlogValidator = vine.compile(
  vine.object({
    blogId: vine.number(),
    authorId: vine.number(),
  })
)

export const IncrementLikeCountValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    blog_id: vine.number(),
  })
)

export const DecrementLikeCountValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    blog_id: vine.number(),
  })
)

export const GetAllFavoritesByUserIdValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
  })
)

export const GetLastTenLikedBlogsByUserIdValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
  })
)
