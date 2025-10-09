import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import AddTask from './AddTask';
import { TaskProvider } from '../context/TaskProvider';

type NavbarProp = {
    fullName: string | null
}

export default function Navbar({fullName}: NavbarProp){
    const router = useRouter();

    const [isActive, setIsActive] = useState(false);
    const [isAddTaskActive, setIsAddTaskActive] = useState(false);

    const handleDashboard = () =>
    {
        setIsActive(false);
    }

    const handleLogout = () => {
        localStorage.clear();
        router.push("/");
    }

    return(
        <>
        {isAddTaskActive && (
            <div className='fixed flex flex-col h-[100dvh] w-[100dvw] bg-black/40 z-10 backdrop-blur-sm items-center justify-center font-extrabold'>
                <AddTask onClose={() => {setIsAddTaskActive(false); setIsActive(true)}} />
            </div>
        )}
        {isActive && (
            <div className='fixed flex flex-col h-[100dvh] w-[100dvw] bg-black/40 z-10 backdrop-blur-sm items-center justify-center font-extrabold text-[5vw] md:text-[2rem]'>
                <div className='relative flex flex-col border-1 items-center bg-background gap-[3vw] py-[3vw] px-[3vw] rounded-[3vw] md:rounded-[2rem] md:py-[2rem] md:px-[3rem] max-h-[80dvh] max-w-[80dvw] overflow-y-scroll no-scrollbar'>
                    <button className='cursor-pointer absolute right-6 top-2' onClick={handleDashboard}>x</button>
                    <div className='flex flex-row items-center gap-3 pt-[3vw] md:pt-[2rem]'>
                        <div className='w-[15vw] h-[15vw] md:w-[5rem] md:h-[5rem] green-to-white rounded-full' />
                        <h2 className=''>{fullName}</h2>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-[3vw] md:gap-[2rem]'>
                        <button onClick={handleDashboard}>Dashboard</button>
                        <button onClick={() => {setIsAddTaskActive(true); setIsActive(false)}}>Add New Task</button>
                    </div>
                    <button onClick={handleLogout} className='text-red-600'>Logout</button>
                </div>
            </div>
        )}
        <div className="flex flex-row items-center py-[4vw] px-[4vw] md:px-[3rem] md:py-[3rem] gap-3 bg-background">
            <button className='cursor-pointer' onClick={() => setIsActive(true)}><Image src="/hamburgerMenu.svg" alt='hamburger menu' width={28} height={18} className='w-[6vw] md:w-[3rem]' /></button>
            <h3 className="uppercase font-black text-[6vw] md:text-[3rem]">Procrastimate</h3>
        </div>
        </>
    )
}