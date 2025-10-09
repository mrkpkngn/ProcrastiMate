import Image from "next/image";

type DashboardWidgetsProps = {
    firstName : string,
    lastName : string,
    pendingLength : number,
    dueTodayLength: number,
    overdueLength : number
}

export default function DashboardWidgets({firstName, lastName, pendingLength, dueTodayLength, overdueLength} : DashboardWidgetsProps){
    return(
        <div className="grid grid-cols-3 grid-rows-2 w-full gap-3 xl:max-w-[50rem]">
            <div className="col-span-3 pink-to-orange p-[5vw] md:p-[2.5rem] flex flex-row relative rounded-[10vw] md:rounded-[5rem] border-1">
                <div className="flex flex-col w-[70%]">
                    <h3 className="font-bold text-[5vw] md:text-[1.75rem]">Welcome Back,</h3>
                    <h2 className="font-extrabold text-[8vw] leading-[10vw] md:text-[3.5rem] md:leading-[3.5rem]">{firstName}<br/>{lastName}</h2>
                </div>
                <Image src="/dashboardPerson.svg" alt="outline image of a person looking at flashcards" width={147} height={164} className="absolute right-0 bottom-0 w-[35vw] md:w-[16rem]"></Image>
            </div>
            <div className="col-span-1 row-span-1 row-start-2 col-start-1 rounded-[8vw] border-1 blue-to-white aspect-square flex flex-col items-center justify-center p-[3vw] md:p-[1.75rem] md:rounded-[3rem]">
                <h3 className="font-bold text-[5vw] leading-[5vw] md:leading-[2rem] md:text-[2rem]">Pending Tasks:</h3>
                <h3 className="font-bold text-[8vw] md:text-[3.5rem]">{pendingLength}</h3>
            </div>
            <div className="col-span-1 row-span-1 row-start-2 col-start-2 rounded-[8vw] border-1 purple-to-pink aspect-square flex flex-col items-center justify-center p-[3vw] md:p-[1.75rem] md:rounded-[3rem]">
                <h3 className="font-bold text-[5vw] leading-[5vw] md:leading-[2rem] md:text-[2rem]">Due Today:</h3>
                <h3 className="font-bold text-[8vw] md:text-[3.5rem]">{dueTodayLength}</h3>
            </div>
            <div className="col-span-1 row-span-1 row-start-2 col-start-3 rounded-[8vw] border-1 blue-to-purple aspect-square flex flex-col items-center justify-center p-[3vw] md:p-[1.75rem] md:rounded-[3rem]">
                <h3 className="font-bold text-[5vw] leading-[5vw] md:leading-[2rem] md:text-[2rem]">Overdue Tasks:</h3>
                <h3 className="font-bold text-[8vw] md:text-[3.5rem]">{overdueLength}</h3>
            </div>
        </div>
    )
}