import vine from '@vinejs/vine'

export const createTaskBodyValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().optional(),
    isCompleted: vine.boolean(),
  })
)

export const getSingleTaskParamsValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)
