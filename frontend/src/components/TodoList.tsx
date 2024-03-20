import React, { useState, useEffect } from "react";
import Task from "../types/Tasks";
import { getTasks, addTask } from "../services/api";

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
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
          />
        ))}
      </div>
    </div>
  );
}
