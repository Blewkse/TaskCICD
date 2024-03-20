import Task from '#models/task'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Task.updateOrCreateMany('id', [
      {
        id: 1,
        name: 'Task 1',
        description: 'Description of Task 1',
      },
      {
        id: 2,
        name: 'Task 2',
        description: 'Description of Task 2',
      },
      {
        id: 3,
        name: 'Task 3',
        description: 'Description of Task 3',
      },
    ])
  }
}
