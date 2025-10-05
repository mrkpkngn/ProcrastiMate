import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskProvider";
import { TaskItem } from "../types/TaskItem";

type AddTaskProp = {
    onClose : () => void;
}

export default function AddTask({onClose} : AddTaskProp){

    const taskContext = useContext(TaskContext);
    if (!taskContext) return null;

    const {addTask, fetchTasks} = taskContext;

    const [isAssignToActive, setIsAssignToActive] = useState(false);
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTask = {
            title,
            description,
            deadline,
            assignedTo: isAssignToActive ? assignTo : null,
            assignedBy: localStorage.getItem("User-Email") || null,
            status: 0
        };

        fetch(`${API_URL}/api/tasks`, {
            "method" : "POST",
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
            addTask(data);
            onClose();
         })
         .catch(err => console.error(err));
    }

    return(
        <div className='fixed flex flex-col h-[100dvh] w-[100dvw] z-10 items-center justify-center text-[5vw]'>
            <div className='relative flex flex-col border-1 bg-background py-[5vw] px-[5vw] rounded-[3vw]'>
                <button className='cursor-pointer absolute right-3 top-2' onClick={onClose}>x</button>
                <h1 className="font-bold text-center">New Task</h1>
                <div className="min-h-[70dvh] w-full">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="title">Task:</label>
                            <input type="text" className="bg-white border-1 py-3 px-3 text-[4vw] font-normal" onChange={(e) => setTitle(e.target.value)} minLength={5} maxLength={30} required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="Deadline">Deadline:</label>
                            <input type="datetime-local" className="bg-white border-1 py-3 px-3 text-[4vw] font-normal  min-h-[12vw] leading-none appearance-none" onChange={(e) => setDeadline(e.target.value)} required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="Description">Description:</label>
                            <textarea rows={4} className="bg-white border-1 py-3 px-3 text-[4vw] font-normal" onChange={(e) => setDescription(e.target.value)} minLength={5} maxLength={120} required />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row gap-3">
                                <input type="checkbox" onChange={(e) => setIsAssignToActive(e.target.checked)} className="bg-white w-5 h-5" />
                                <p className="text-[4vw]">Assign to someone else?</p>
                            </div>
                            <input type="email" className={`${isAssignToActive ? "opacity-100" : "opacity-0"} bg-white border-1 py-3 px-3 text-[4vw] font-normal opacity-0`} onChange={(e) => setAssignTo(e.target.value)} />
                        </div>
                        <input type="submit" className={`grow-0 px-6 py-2 green-to-white rounded-[5vw]`} value={"Submit >"}/>
                    </form>
                </div>
            </div>
        </div>
    )
}