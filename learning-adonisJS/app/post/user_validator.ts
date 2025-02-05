import vine from '@vinejs/vine'

export const LoginValidator = vine.compile(
  vine.object({
    email: vine.string(),
    password: vine.string().minLength(5).maxLength(20),
  })
)
