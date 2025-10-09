import { useContext, useState } from "react";
import { TaskItem } from "../types/TaskItem";
import { TaskContext } from "../context/TaskProvider";

type EditTaskProps = {
    task: TaskItem;
    onClose: () => void;
}

export default function EditTask({task, onClose} : EditTaskProps){

        const taskContext = useContext(TaskContext);
        if (!taskContext) return null;
    
        const {updateTask} = taskContext;
    
        const [isAssignToActive, setIsAssignToActive] = useState(false);
        const [title, setTitle] = useState(`${task.title}`);
        const [deadline, setDeadline] = useState(task.deadline ? new Date(task.deadline).toISOString().slice(0,16) : "");
        const [description, setDescription] = useState(`${task.description}`);
        const [assignTo, setAssignTo] = useState(`${task.assignedTo || ""}`);
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
    
            const newTask = {
                title,
                description,
                deadline: deadline,
                assignedTo: isAssignToActive ? assignTo : null,
                status: Number(task.status)
            };
            
            if(newTask.deadline)
            {
                newTask.deadline = new Date(deadline).toISOString()
                console.log(newTask.deadline)
            }

            fetch(`${API_URL}/api/tasks/${task.id}`, {
                "method" : "PUT",
                headers : {
                    "Content-Type" : "application/json",
                    "User-Email" : localStorage.getItem("User-Email") || "",
                },
                body: JSON.stringify(newTask)
            })
             .then(res => {
                if(!res.ok) throw new Error(`ERROR! Status: ${res.status}`);
                return res.json();
             })
             .then(data => {
                updateTask(data);
                onClose();
             })
             .catch(err => console.error(err));
        }

    return(
        <div className='fixed flex flex-col h-[100dvh] w-[100dvw] z-10 items-center justify-center text-[5vw] md:text-[1.75rem]'>
            <div className='relative flex flex-col border-1 bg-background py-[5vw] px-[5vw] md:py-[3rem] md:px-[3rem] rounded-[3vw] md:rounded-[3vw] max-h-[80vh] max-w-[80dvw] overflow-y-scroll no-scrollbar'>
                <button className='cursor-pointer absolute right-3 md:right-6 top-2 font-extrabold' onClick={onClose}>x</button>
                <h1 className="font-bold text-center">Edit Task</h1>
                <div className="h-[70dvh] md:h-[45rem]  w-full flex flex-col items-center justify-center">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="title">Task:</label>
                            <input type="text" className="bg-white border-1 py-3 px-3 text-[4vw] md:text-[1.5rem] font-normal" onChange={(e) => setTitle(e.target.value)} minLength={5} maxLength={30} required value={title} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="Deadline">Deadline:</label>
                            <input type="datetime-local" className="bg-white border-1 py-3 px-3 text-[4vw] md:text-[1.5rem] font-normal leading-none appearance-none" onChange={(e) => setDeadline(e.target.value)} value={deadline} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="Description">Description:</label>
                            <textarea rows={4} className="bg-white border-1 py-3 px-3 text-[4vw] md:text-[1.5rem] font-normal" onChange={(e) => setDescription(e.target.value)} minLength={5} maxLength={120} value={description} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row items-center gap-3">
                                <input type="checkbox" onChange={(e) => setIsAssignToActive(e.target.checked)} className="bg-white w-5 h-5 md:w-[2rem] md:h-[2rem]" />
                                <p className="text-[4vw] md:text-[1.75rem]">Assign to someone else?</p>
                            </div>
                            <input type="email" className={`${isAssignToActive ? "opacity-100" : "opacity-0"} bg-white border-1 py-3 px-3 text-[4vw] md:text-[2rem] font-normal opacity-0`} onChange={(e) => setAssignTo(e.target.value)} value={assignTo || ""} />
                        </div>
                        <input type="submit" className={`grow-0 px-6 py-2 green-to-white rounded-[5vw] md:rounded-[2rem]`} value={"Submit >"}/>
                    </form>
                </div>
            </div>
        </div>
    );
}