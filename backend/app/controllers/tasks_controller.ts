import Task from '#models/task'
import { createTaskBodyValidator, getSingleTaskParamsValidator } from '#validators/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  /**
   * Return list of all posts or paginate through
   * them
   */
  async index({}: HttpContext) {
    return Task.all()
  }

  /**
   * Handle form submission to create a new post
   */
  async store({ request }: HttpContext) {
    const { name, description } = await request.validateUsing(createTaskBodyValidator)

    return Task.create({ name, description })
  }

  /**
   * Display a single post by id.
   */
  async show({ request }: HttpContext) {
    const { params } = await request.validateUsing(getSingleTaskParamsValidator)

    return Task.findOrFail(params.id)
  }

  /**
   * Handle the form submission to update a specific post by id
   */
  async update({ params, request }: HttpContext) {
    const { name, description } = await request.validateUsing(createTaskBodyValidator)
    const task = await Task.findOrFail(params.id)

    task.merge({ name, description })

    return task.save()
  }

  /**
   * Handle the form submission to delete a specific post by id.
   */
  async destroy({ request, response }: HttpContext) {
    const { params } = await request.validateUsing(getSingleTaskParamsValidator)

    const task = await Task.findOrFail(params.id)

    await task.delete()

    return response.noContent()
  }
}
