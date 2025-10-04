"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Dashboard()
{
    const router = useRouter();

    useEffect(() => {
        const email = localStorage.getItem("User-Email");
        const fullName = localStorage.getItem("User-FullName");
        if(email == null || fullName == null)
        {
            alert("⚠️ Please Login First!")
            router.push("/login");
        }
    })
    return(
        <div className="flex flex-col h-[100dvh]">
            
        </div>
    )
}