"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import { TaskItem } from "../../../types/TaskItem";
import TaskCard from "../../../components/TaskCard"
import DashboardWidgets from "../../../components/DashboardWidgets";

export default function Dashboard()
{
    const router = useRouter();
    const[email, setEmail] = useState <string | null>(null);
    const[fullName, setFullName] = useState <string | null>(null);

    const getNameLines = () => {
        if (!fullName) return ["Guest"];

        const parts = fullName.split(" ");
        const firstName = parts[0];
        const lastName = parts.slice(1).join(" ");
        return [firstName, lastName];
    };

    const [firstName, lastName] = getNameLines();
    const [pendingTask, setPendingTask] = useState<TaskItem[]>([]);
    const [dueTodayTask, setDueTodayTask] = useState<TaskItem[]>([]);
    const [overdueTask, setOverdueTask] = useState<TaskItem[]>([]);
    const [filter, setFilter] = useState("By Deadline");
    const [taskList, setTaskList] = useState<TaskItem[]>([]);

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);
        let url = ""

        switch(selectedFilter){
            case "All":
                url = "/mockAllTask.json";
                break;
            
            case "Pending":
                url="/mockPendingTask.json";
                break;
            
            case "Overdue":
                url="/mockOverdueTask.json";
                break;
            
            case "Done":
                url="/mockDoneTask.json";
                break;
        }

        fetch(url)
         .then((res) => res.json())
         .then((data) => setTaskList(data))
         .catch((err)=> console.log("Error!: ", err));
    }

    useEffect(() => {
        const localEmail = localStorage.getItem("User-Email");
        const localFullname = localStorage.getItem("User-FullName");
        if(localEmail == null || localFullname == null)
        {
            alert("⚠️ Please Login First!")
            router.push("/login");
        }

        setEmail(localEmail);
        setFullName(localFullname);

        fetch("/mockAllTask.json")
         .then((res) => res.json())
         .then((data) => setTaskList(data))
         .catch((err)=> console.error("Error loading tasks:", err))

        fetch("/mockPendingTask.json")
         .then((res) => res.json())
         .then((data) => setPendingTask(data))
         .catch((err)=> console.error("Error loading tasks:", err))

        fetch("/mockDueTodayTask.json")
         .then((res) => res.json())
         .then((data) => setDueTodayTask(data))
         .catch((err)=> console.error("Error loading tasks:", err))

        fetch("/mockOverdueTask.json")
         .then((res) => res.json())
         .then((data) => setOverdueTask(data))
         .catch((err)=> console.error("Error loading tasks:", err))

    }, [])
    return(
        <>
        <Navbar fullName={fullName} />
        <div className="flex flex-col min-h-[100dvh] px-[5vw]">
            <DashboardWidgets firstName={firstName} lastName={lastName} pendingLength={pendingTask.length} dueTodayLength={dueTodayTask.length} overdueLength={overdueTask.length} />
            <div className="flex flex-col items-center justify-center w-full gap-6">
                <div className="flex flex-row justify-between items-center w-full">
                    <h3 className="font-bold text-[7vw]">Tasks</h3>
                    <div className="relative">
                    <select name="currentFilter" value={filter} onChange={handleFilter} className="bg-white border-1 py-[1vw] rounded-[5vw] text-center appearance-none pr-[10vw] pl-[5vw]">
                        <option value={"All"} className="text-center">All</option>
                        <option value={"Pending"} className="text-center">Pending</option>
                        <option value={"Overdue"} className="text-center">Overdue</option>
                        <option value={"Done"} className="text-center">Done</option>
                    </select>
                    <Image src={"/dropdown.svg"} alt="Arrow down" width={30} height={30} className="absolute top-0 right-3 pointer-events-none"></Image>
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full pb-20">
                     {taskList && taskList.length > 0 ? (taskList.map(task => <TaskCard key={task.id} task={task} />)) : (<p>No tasks available</p>)}
                </div>
            </div>
        </div>
        </>

    )
}