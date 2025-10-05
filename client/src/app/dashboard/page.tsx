"use client"
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { TaskProvider } from "../../../context/TaskProvider";
import Dashboard from "./Dashboard";
import { useRouter } from "next/navigation";

export default function Page()
{
    const router = useRouter();
    
    const [fullName, setFullName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    
    useEffect(() => {
            const storedEmail = localStorage.getItem("User-Email");
            const storedFullName = localStorage.getItem("User-FullName");
    
            setEmail(storedEmail);
            setFullName(storedFullName);
    
            if (!storedEmail) {
                alert("You need to login first! Try again");
                router.push("/login");
            }
        }, []);
    return(
        <TaskProvider>
            <Navbar fullName={fullName} />
            <Dashboard fullName={fullName} />
        </TaskProvider>

    )
}