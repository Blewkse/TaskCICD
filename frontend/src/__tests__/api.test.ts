// api.test.ts
import axios from "axios";
import { getTasks, addTask, updateTask, deleteTask } from "../services/api";
import Task from "../types/Tasks";

// Mocking axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API tests", () => {
  it("should fetch tasks", async () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        name: "Task 1",
        description: "Description 1",
        isCompleted: false,
        createdAt: "2022-01-01",
      },
      {
        id: 2,
        name: "Task 2",
        description: "Description 2",
        isCompleted: true,
        createdAt: "2022-01-01",
      },
    ];

    mockedAxios.get.mockResolvedValue({ data: mockTasks });

    const tasks = await getTasks();
    expect(tasks).toEqual(mockTasks);
  });

  it("should add a task", async () => {
    const newTask: Task = {
      id: 3,
      name: "New Task",
      description: "New Description",
      createdAt: "2022-01-01",
      isCompleted: false,
    };
    mockedAxios.post.mockResolvedValue({ data: newTask });

    const task = await addTask("New Task", "New Description");
    expect(task).toEqual(newTask);
  });

  it("should update a task", async () => {
    const updatedTask: Task = {
      id: 1,
      name: "Updated Task",
      description: "Updated Description",
      isCompleted: true,
      createdAt: "2022-01-01",
    };
    mockedAxios.put.mockResolvedValue({ data: updatedTask });

    const task = await updateTask(updatedTask);
    expect(task).toEqual(updatedTask);
  });

  it("should delete a task", async () => {
    mockedAxios.delete.mockResolvedValue({});

    await deleteTask(1);
  });
});
