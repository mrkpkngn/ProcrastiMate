'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Login(){
    const router = useRouter();

    
    useEffect(() => {
    if(localStorage.getItem("User-Email") && localStorage.getItem("User-FullName")){
        router.push("/dashboard");
    }
    }, [])

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem("User-FullName", fullName);
        localStorage.setItem("User-Email", email);

        const fullnameCheck = localStorage.getItem("User-FullName");
        const emailCheck = localStorage.getItem("User-Email");

        if(fullnameCheck && emailCheck){
            router.push("/dashboard");
        }
        else{
            alert("⚠️ Could not save login info. Please try again.")
        }

    }

    return(
        <div className="flex flex-col xl:flex-row items-center justify-center">
            <div className="hidden xl:flex flex-col justify-center w-[60vw] h-[100dvh] blue-to-white">
                <div className="flex flex-col text-center">
                              <Image
                                src="/logo.webp"
                                alt="ProcrastiMate Logo"
                                width={1080}
                                height={0}
                                className="mx-auto mb-4 md:mb-8"
                              ></Image>
                    <p className="text-[1.5em] 2xl:text-[1.75rem]">Because procrastinating needs planning too.</p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center xl:w-[40vw] xl:border-l-1">
            <header className="font-black uppercase text-[clamp(1rem,7vw,3rem)] py-[5vw] md:text-[3rem] md:py-[2rem] xl:hidden">Procrastimate</header>
            <div className="flex flex-col items-center justify-center h-[70dvh] xl:h-[100dvh]  gap-6">
                <Link href="/" className="cursor-pointer self-start hover:underline md:text-[1.5rem]">{`< Back`}</Link>
                <h2 className="font-black text-[clamp(1rem,7vw,3rem)] md:text-[3rem]">Login</h2>
                <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col w-[70vw] md:w-[35rem] xl:w-[28rem]">
                        <label htmlFor="fullName" className="text-[clamp(1rem,5vw,5rem)] md:text-[2rem] xl:text-[1.75rem]">Full Name:</label>
                        <input type="text" id="fullName" name="fullName" onChange={(e) => setFullName(e.target.value)} className="bg-white border-1 text-[clamp(1rem,4vw,3rem)] md:text-[2rem] xl:text-[1.75rem] md:py-[1rem] py-[2vw] text-center" placeholder="Mark Pakingan" required></input>
                    </div>
                    <div className="flex flex-col w-[70vw] md:w-[35rem] xl:w-[28rem]">
                        <label htmlFor="email" className="text-[clamp(1rem,5vw,5rem)] md:text-[2rem] xl:text-[1.75rem]">Email:</label>
                        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} className="bg-white border-1 text-[clamp(1rem,4vw,3rem)] py-[2vw] md:text-[2rem] xl:text-[1.75rem] md:py-[1rem] text-center" placeholder="contact@markpakingan.com" required></input>
                    </div>
                    <input type="submit" className="green-to-white py-2 px-16 grow-0 text-[clamp(1rem,2vw,5rem)] md:text-[1.5rem] md:py-[1rem] md:px-[5rem] rounded-[8vw] mt-10" value={"Login >"}></input>
                </form>
            </div>
            </div>
        </div>
    )
}