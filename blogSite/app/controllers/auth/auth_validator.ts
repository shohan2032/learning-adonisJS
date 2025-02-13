import vine from '@vinejs/vine'

export const RegisterValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string().minLength(5).maxLength(20),
  })
)

export const LoginValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string(),
  })
)
