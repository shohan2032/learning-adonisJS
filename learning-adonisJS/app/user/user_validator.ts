import vine from '@vinejs/vine'

export const LoginValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string(),
  })
)

export const RegisterValidator = vine.compile(
  vine.object({
    username: vine.string(),
    email: vine.string().email(),
    password: vine.string().minLength(5).maxLength(20),
  })
)
