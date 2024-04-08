import { useState, useEffect } from "react";
import Task from "../types/Tasks";
import { getTasks, addTask, deleteTask, updateTask } from "../services/api";
import TaskItem from "./Task";
export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

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
        const newTask = await addTask(newTaskTitle, newTaskDescription);
        setTasks((prevTasks) => [newTask, ...prevTasks]);
        setNewTaskTitle("");
        setNewTaskDescription("");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = async (editedTask: Task) => {
    try {
      const updatedTask = await updateTask(editedTask);
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="todolist">
      <div className="add-task">
        <label htmlFor="input" className="label">Task name</label>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <label htmlFor="textarea" className="label">Task infos</label>
        <textarea
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
    </div>

    <div className="separator"></div>

    <div className="task-count">
    You have {tasks.length} tasks !
    </div>

    <div className="separator second"></div>

        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
    </div>
  );
}
