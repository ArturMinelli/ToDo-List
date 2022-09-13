import { Header } from './components/Header';
import styles from './App.module.css';
import './global.css'
import { Tasks } from './components/Tasks';
import { useState, useEffect } from 'react';

export interface TaskInteface {
  id: string;
  title:  string;
  isCompleted: boolean;
}

const LOCAL_STORAGE_KEY = 'todo:savedTasks';

function App() {

  const [tasks, setTasks] = useState<TaskInteface[]>([]);

  function setTasksAndSave(newTasks: TaskInteface[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function loadSavedTasks() {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      setTasksAndSave(JSON.parse(savedTasks));
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function addTask(taskTitle: string) {
    setTasksAndSave([...tasks, {
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted: false
    }])
  }

  function deleteTask(taskId: string) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskIsCompleted(taskId: string) {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
        return {...task, isCompleted: !task.isCompleted};
      } else {
        return task;
      }
    })
    setTasksAndSave(newTasks);
  }

  return (
    <div>
      <Header onAddTask={addTask}/>
      <Tasks tasks={tasks} onDeleteTask={deleteTask} onToggleTaskIsCompleted={toggleTaskIsCompleted}/>
    </div>
  );
}

export default App
