import { useState } from "react";
import { TaskItem } from "../types/TaskItem";
import TaskDetails from "./TaskDetails";

type TaskCardProps = {
    task : TaskItem
}

export default function TaskCard({task} : TaskCardProps){
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

    return (
    <>
    {isDetailsActive && (
        <div className="fixed w-[100dvw] inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <TaskDetails task={task} onClose={() => setIsDetailsActive(false)} />
         </div>
    )}

    <div key={task.id} className="flex flex-col bg-white  border-1 py-[5vw] px-[5vw] w-full rounded-[5vw]">
        <h3 className="text-[4vw]">{formatedDeadline}</h3>
        <div className="flex flex-row justify-between">
            <h1 className="text-[7vw]">{formatedTitle}</h1>
            <button className={`${isPending ? "bg-red-600" : "bg-green-400"} aspect-square w-[10vw] h-[10vw] border-1`} />
        </div>
        <button className="cursor-pointer text-[3vw] hover:underline grow-0 self-start" onClick={() => setIsDetailsActive(true)}>Details</button>
    </div>
    </>
    )
}