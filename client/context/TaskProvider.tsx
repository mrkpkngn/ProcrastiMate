"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { TaskItem } from "../types/TaskItem";
import { useRouter } from "next/navigation";

interface TaskContextType {
  taskList: TaskItem[];
  pendingTask: TaskItem[];
  dueTodayTask: TaskItem[];
  doneTask: TaskItem[];
  overdueTask: TaskItem[];
  filter: string;
  addTask: (task : TaskItem) => void;
  setFilter: (filter: string) => void;
  fetchTasks: () => void;
  deleteTask: (id: number) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [taskList, setTaskList] = useState<TaskItem[]>([]);
    const [email, setEmail] = useState<string | null>("")
    const [pendingTask, setPendingTask] = useState<TaskItem[]>([]);
    const [doneTask, setDoneTask] = useState<TaskItem[]>([]);
    const [dueTodayTask, setDueTodayTask] = useState<TaskItem[]>([]);
    const [overdueTask, setOverdueTask] = useState<TaskItem[]>([]);
    const [filter, setFilter] = useState("All");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchTasks = () => {
    if (!email) return;
    let url = `${API_URL}/api/tasks`;
    switch(filter){
      case "Pending": url = `${API_URL}/api/tasks/filter?status=0`; break;
      case "Overdue": url = `${API_URL}/api/tasks/filter?status=2`; break;
      case "Done": url = `${API_URL}/api/tasks/filter?status=1`; break;
    }

    fetch(url, { 
        method : "GET",
        headers: { 
            "Content-Type": "application/json",
            "User-Email": email
        } })
      .then(res => res.json())
      .then(data => setTaskList(data))
      .catch(err => console.error("Error loading tasks:", err));
  };

const addTask = (task: TaskItem) => {
  setTaskList(prev => [...prev, task]);

  if (task.status === 0) setPendingTask(prev => [...prev, task]);
  if (task.status === 1) setDoneTask(prev => [...prev, task]);

  const today = new Date();
  const deadline = task.deadline ? new Date(task.deadline) : null;

  if (deadline) {
    if (deadline.toDateString() === today.toDateString()) {
      setDueTodayTask(prev => [...prev, task]);
    } else if (deadline < today && task.status === 0) {
      setOverdueTask(prev => [...prev, task]);
    }
  }
};


const deleteTask = (id: number) => {
  setTaskList(prev => prev.filter(task => task.id !== id));
  setPendingTask(prev => prev.filter(task => task.id !== id));
  setDoneTask(prev => prev.filter(task => task.id !== id));
  setDueTodayTask(prev => prev.filter(task => task.id !== id));
  setOverdueTask(prev => prev.filter(task => task.id !== id));
};


  useEffect(() => {
    setEmail(localStorage.getItem("User-Email"));
  }, [])

useEffect(() => {
    if(!email) return;
    fetch(`${API_URL}/api/tasks`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "User-Email" : email,
        }
    })
     .then((res) => res.json())
     .then((data) => setTaskList(data))
     .catch((err)=> console.error("Error loading tasks:", err))

    fetch(`${API_URL}/api/tasks/filter?status=0`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "User-Email" : email,
            }
        })
         .then((res) => res.json())
         .then((data) => setPendingTask(data))
         .catch((err)=> console.error("Error loading tasks:", err))

    fetch(`${API_URL}/api/tasks/dueToday`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "User-Email" : email,
            }
        })
         .then((res) => res.json())
         .then((data) => setDueTodayTask(data))
         .catch((err)=> console.error("Error loading tasks:", err))

    fetch(`${API_URL}/api/tasks/filter?status=2`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "User-Email" : email,
            }
        })
         .then((res) => res.json())
         .then((data) => setOverdueTask(data))
         .catch((err)=> console.error("Error loading tasks:", err))
  }, [email])

  useEffect(() => {
    fetchTasks();
  }, [filter, email])

  return(
    <TaskContext.Provider value={{ taskList, pendingTask, dueTodayTask, doneTask, overdueTask, filter, addTask, setFilter, fetchTasks, deleteTask }}>
        {children}
    </TaskContext.Provider>
  )
}