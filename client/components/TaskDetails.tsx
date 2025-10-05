import { TaskItem } from "../types/TaskItem"
import Image from "next/image";
import { TaskContext } from "../context/TaskProvider";
import { useContext } from "react";

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

    return(
        <div className='fixed flex flex-col h-[100dvh] w-[100dvw] bg-black/40 z-10 backdrop-blur-sm items-center justify-center font-extrabold text-[5vw]'>
            <div className='relative flex flex-col border-1 bg-background py-[5vw] px-[5vw] rounded-[3vw]'>
                <button className='cursor-pointer absolute right-3 top-2' onClick={onClose}>x</button>
                <h1 className="font-bold text-center">Details</h1>
                <div className="h-[65vh] flex flex-col justify-center gap-3">
                    <div className="flex flex-col">
                        <h2>Task:</h2>
                        <p className="font-normal text-[4vw]">{task.title}</p>
                    </div>
                    <div className="flex flex-col">
                        <h2>Description:</h2>
                        <div className="h-[30vh] w-[70vw] bg-white border-1 p-6 overflow-y-scroll">
                            <p className="font-normal text-[4vw]">{task.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h2>Deadline:</h2>
                        <p className="font-normal text-[4vw]">{formatedDeadline}</p>
                    </div>
                    <div className="flex flex-col">
                        <h2>Assigned By:</h2>
                        <p className="font-normal text-[4vw]">{task.assignedBy}</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <button className="flex flex-row gap-1">
                            <Image src="/edit.svg" alt="Edit icon" width={24} height={24} className="w-[6vw]" />
                            <p className="font-normal text-[4vw]">Edit</p>
                        </button>
                         <button className="flex flex-row gap-1" onClick={handleDelete}>
                            <Image src="/delete.svg" alt="Edit icon" width={24} height={24} className="w-[6vw]" />
                            <p className="font-normal text-[4vw]">Delete</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}