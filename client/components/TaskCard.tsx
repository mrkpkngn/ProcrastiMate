import { useContext, useState } from "react";
import { TaskItem } from "../types/TaskItem";
import TaskDetails from "./TaskDetails";
import { TaskContext } from "../context/TaskProvider";

type TaskCardProps = {
    task : TaskItem
}

export default function TaskCard({task} : TaskCardProps){
    const taskContext = useContext(TaskContext);
    if (!taskContext) return null;

    const {updateTask} = taskContext;
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [isDetailsActive, setIsDetailsActive] = useState(false);

    const deadline = new Date(task.deadline);
    const formatedDeadline = deadline.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
    })

    let formatedTitle = "";
    if(task.title.length > 15)
    {
        formatedTitle = task.title.substring(0, 15) + "...";
    }
    else{
        formatedTitle = task.title
    }

    let isPending = true;
    if(task.status == 1) isPending = false;

    const handleSetStatus = () => {
        if(isPending){
            fetch(`${API_URL}/api/tasks/${task.id}/done/`, {
                method : "PUT",
                headers: {
                    "Content-Type" : "application/json",
                    "User-Email": localStorage.getItem("User-Email") || ""
                }
            })
            .then(res => {
                if(!res.ok) throw new Error(`ERROR! Status: ${res.status}`);
                isPending = false;
                return res.json();
            })
            .then(data => updateTask(data))
            .catch(err => console.error(err));
        }
        else{
            fetch(`${API_URL}/api/tasks/${task.id}/pending/`, {
                method : "PUT",
                headers: {
                    "Content-Type" : "application/json",
                    "User-Email": localStorage.getItem("User-Email") || ""
                }
            })
            .then(res => {
                if(!res.ok) throw new Error(`ERROR! Status: ${res.status}`);
                isPending = false;
                return res.json();
            })
            .then(data => {
                updateTask(data);
            })
            .catch(err => console.error(err));
        }

    }

    return (
    <>
    {isDetailsActive && (
        <div className="fixed w-[100dvw] inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <TaskDetails task={task} onClose={() => setIsDetailsActive(false)} />
         </div>
    )}

    <div key={task.id} className="flex flex-col bg-white  border-1 py-[5vw] px-[5vw] md:px-[2.5rem] md:py-[2.5rem] w-full rounded-[5vw] md:rounded-[2.5rem]">
        <h3 className="text-[4vw] md:text-[1.25rem]">{formatedDeadline}</h3>
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-[7vw] md:text-[2.5rem]">{formatedTitle}</h1>
            <button className={`${isPending ? "bg-red-600" : "bg-green-400"} aspect-square w-[10vw] h-[10vw] md:w-[4rem] md:h-[4rem] border-1`}  onClick={handleSetStatus}/>
        </div>
        <button className="cursor-pointer text-[3vw] md:text-[1rem] hover:underline grow-0 self-start" onClick={() => setIsDetailsActive(true)}>Details</button>
    </div>
    </>
    )
}