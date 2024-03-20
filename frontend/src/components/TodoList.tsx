import React, { useState, useEffect } from "react";
import Task from "./Task";
import { Task as TaskType, getTasks, addTask, updateTask, deleteTask } from "../services/api";

export default function TodoList() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      if (newTaskTitle.trim() !== "") {
        const newTask = await addTask(newTaskTitle);
        setTasks([...tasks, newTask]);
        setNewTaskTitle("");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async (updatedTask: TaskType) => {
    try {
      const updatedTaskList = tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(updatedTaskList);
      await updateTask(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      const updatedTaskList = tasks.filter(task => Number(task.id) !== taskId);
      setTasks(updatedTaskList);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        {tasks.map(task => (
          <Task
            key={task.id}
            {...task}
            onUpdate={() => handleUpdateTask(task)}
            onDelete={() => handleDeleteTask(Number(task.id))}
          />
        ))}
      </div>
    </div>
  );
}
