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
      },
      {
        id: 2,
        name: "Task 2",
        description: "Description 2",
        isCompleted: true,
      },
    ];

    mockedAxios.get.mockResolvedValue({ data: mockTasks });

    const tasks = await getTasks();
    expect(tasks).toEqual(mockTasks);
    expect(mockedAxios.get).toHaveBeenCalledWith("http://0.0.0.0:3333/tasks");
  });

  it("should add a task", async () => {
    const newTask: Task = {
      id: 3,
      name: "New Task",
      description: "New Description",
      isCompleted: false,
    };
    mockedAxios.post.mockResolvedValue({ data: newTask });

    const task = await addTask("New Task", "New Description");
    expect(task).toEqual(newTask);
    expect(mockedAxios.post).toHaveBeenCalledWith("http://0.0.0.0:3333/tasks", {
      name: "New Task",
      description: "New Description",
      isCompleted: false,
    });
  });

  it("should update a task", async () => {
    const updatedTask: Task = {
      id: 1,
      name: "Updated Task",
      description: "Updated Description",
      isCompleted: true,
    };
    mockedAxios.put.mockResolvedValue({ data: updatedTask });

    const task = await updateTask(updatedTask);
    expect(task).toEqual(updatedTask);
    expect(mockedAxios.put).toHaveBeenCalledWith(
      "http://0.0.0.0:3333/tasks/1",
      updatedTask
    );
  });

  it("should delete a task", async () => {
    mockedAxios.delete.mockResolvedValue({});

    await deleteTask(1);
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      "http://0.0.0.0:3333/tasks/1"
    );
  });
});
