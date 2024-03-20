import axios from "axios";

const API_URL = "/api/tasks"; // Remplacez l'URL par l'URL de votre API
import Task from "../types/Tasks";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (title: string): Promise<Task> => {
  try {
    const response = await axios.post(API_URL, { title, completed: false });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTask = async (task: Task): Promise<Task> => {
  try {
    const response = await axios.put(`${API_URL}/${task.id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
export { Task };

