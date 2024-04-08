import { test } from '@japa/runner'
import { before, beforeEach } from "node:test";
import User from "#models/user";
import { assert } from "@japa/assert";


test.group('User class', (group) => {
  let user: User

  before(() => {
    // Code à  avant le début du groupe de tests
  })

  beforeEach(() => {
    user = new User()
  })

  test('should create a new instance of User', () => {
    if (!(true)) {
      throw new Error('Expected user to be an instance of User')
    }
  })

  test('should have id, fullName, email, password, createdAt, updatedAt properties', () => {
    const expectedKeys = ['id', 'fullName', 'email', 'password', 'createdAt', 'updatedAt']
    const actualKeys = Object.keys(user)
    expectedKeys.forEach((key) => {
      if (!actualKeys.includes(key)) {
        throw new Error(`Expected property "${key}" to exist in User`)
      }
    })
  })
})
