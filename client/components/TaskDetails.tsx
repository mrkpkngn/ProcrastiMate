import { TaskItem } from "../types/TaskItem"

type TaskDetailsProps = {
    task: TaskItem;
    onClose: () => void;
}

export default function TaskDetails({task, onClose} : TaskDetailsProps){
    const deadline = new Date(task.deadline);
    const formatedDeadline = deadline.toLocaleDateString("en-US", {
        "month": "long",
        "day" : "numeric",
        "hour" : "2-digit",
        "minute": "2-digit",
        "year": "numeric"
    })

    return(
        <div className='fixed flex flex-col h-[100dvh] w-[100dvw] bg-black/40 z-10 backdrop-blur-sm items-center justify-center font-extrabold text-[5vw]'>
            <div className='relative flex flex-col border-1 bg-background py-[5vw] px-[5vw] rounded-[3vw]'>
                <button className='cursor-pointer absolute right-3 top-2' onClick={onClose}>x</button>
                <h1 className="font-bold text-center">Details</h1>
                <div className="h-[70vh] flex flex-col justify-center gap-3">
                    <div className="flex flex-col">
                        <h2>Task:</h2>
                        <p className="font-normal text-[4vw]">{task.title}</p>
                    </div>
                    <div className="flex flex-col">
                        <h2>Description:</h2>
                        <div className="w-full h-[30vh] bg-white border-1 p-6 overflow-y-scroll">
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
                </div>
            </div>
        </div>
    )
}