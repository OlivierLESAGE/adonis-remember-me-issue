import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(8).confirmed(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string(),
  })
)
