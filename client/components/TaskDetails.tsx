import { TaskItem } from "../types/TaskItem"
import Image from "next/image";
import { TaskContext } from "../context/TaskProvider";
import { useContext, useState } from "react";
import { on } from "events";
import EditTask from "./EditTask";

type TaskDetailsProps = {
    task: TaskItem;
    onClose: () => void;
}

export default function TaskDetails({task, onClose} : TaskDetailsProps){;
    const taskContext = useContext(TaskContext);
    if (!taskContext) return null;
    const {deleteTask} = taskContext;
    const deadline = new Date(task.deadline);
    const formatedDeadline = deadline.toLocaleDateString("en-US", {
        "month": "long",
        "day" : "numeric",
        "hour" : "2-digit",
        "minute": "2-digit",
        "year": "numeric"
    })

    const [isEditActive, setIsEditActive] = useState(false);

    const handleDelete = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${task.id}`, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            "User-Email" : localStorage.getItem("User-Email") || "",
        }
    })
     .then(res => {
        if(!res.ok) throw new Error(`ERROR! Status: ${res.status}`);
        deleteTask(task.id);
        onClose();
     })
    .catch(err => console.error(err));
    }

    const handleEdit = () => {
        setIsEditActive(true);
    }

    return(
        <>
        {isEditActive && (
            <EditTask task={task} onClose={() => setIsEditActive(false)} />
        )}
        {!isEditActive && (
            <div className='fixed flex flex-col h-[100dvh] w-[100dvw] z-10 items-center justify-center font-extrabold text-[5vw] md:text-[1.75rem]'>
            <div className='relative flex flex-col border-1 bg-background py-[5vw] px-[5vw] rounded-[3vw] md:py-[3rem] md:px-[3rem] md:rounded-[2rem] max-h-[80vh] max-w-[80dvw] overflow-y-scroll no-scrollbar'>
                <button className='cursor-pointer absolute right-6 top-2' onClick={onClose}>x</button>
                <h1 className="font-bold text-center">Details</h1>
                <div className="md:h-[45rem] flex flex-col justify-center gap-3">
                    <div className="flex flex-col">
                        <h2>Task:</h2>
                        <p className="font-normal text-[4vw] md:text-[1.5rem]">{task.title}</p>
                    </div>
                    <div className="flex flex-col">
                        <h2>Description:</h2>
                        <div className="h-[30vh] max-w-[70vw] md:h-[20rem] md:w-[30rem] bg-white border-1 p-6 overflow-y-scroll no-scrollbar">
                            <p className="font-normal text-[4vw] md:text-[1.5rem]">{task.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h2>Deadline:</h2>
                        <p className="font-normal text-[4vw] md:text-[1.5rem]">{formatedDeadline}</p>
                    </div>
                    <div className="flex flex-col">
                        <h2>Assigned By:</h2>
                        <p className="font-normal text-[4vw] md:text-[1.5rem]">{task.assignedBy}</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <button className="flex flex-row items-center gap-1" onClick={handleEdit}>
                            <Image src="/edit.svg" alt="Edit icon" width={24} height={24} className="w-[6vw] md:w-[2rem]" />
                            <p className="font-normal text-[4vw] md:text-[1.5rem]">Edit</p>
                        </button>
                         <button className="flex flex-row items-center gap-1" onClick={handleDelete}>
                            <Image src="/delete.svg" alt="Edit icon" width={24} height={24} className="w-[6vw] md:w-[2rem]" />
                            <p className="font-normal text-[4vw] md:text-[1.5rem]">Delete</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )}
        </>
    )
}