import axios from "axios";

const API_URL = "http://0.0.0.0:3333/tasks"; // Remplacez l'URL par l'URL de votre API
import Task from "../types/Tasks";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(API_URL);
    console.log("response.data", response.data);
  
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (name: string, description: string): Promise<Task> => {
  try {
    const response = await axios.post(API_URL, { name, description, isCompleted: false });
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
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    console.error("Error deleting task:", error);
    throw error;
  }
};
