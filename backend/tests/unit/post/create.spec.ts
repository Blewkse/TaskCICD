import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import Task from '#models/task'

test.group('Post', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  test('Create task test', async ({ assert }) => {
    const task = new Task()
    task.name = 'Nouvelle tâche'
    task.description = 'Description de la nouvelle tâche'
    await task.save()

    // Vérifiez si la tâche a été enregistrée avec succès
    const savedTask = await Task.find(task.id)
    assert.exists(savedTask, 'La tâche a été créée avec succès')
    assert.equal(savedTask?.name, 'Nouvelle tâche', 'Le titre de la tâche correspond')
    assert.equal(
      savedTask?.description,
      'Description de la nouvelle tâche',
      'La description de la tâche correspond'
    )
  })
})
