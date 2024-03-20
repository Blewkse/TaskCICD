import vine from '@vinejs/vine'

export const createTaskBodyValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().optional(),
  })
)

export const getSingleTaskParamsValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)
