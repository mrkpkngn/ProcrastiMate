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
        <div className="grid grid-cols-3 grid-rows-2 w-full gap-3">
            <div className="col-span-3 pink-to-orange p-[5vw] flex flex-row relative rounded-[10vw] border-1">
                <div className="flex flex-col w-[70%]">
                    <h3 className="font-bold text-[5vw]">Welcome Back,</h3>
                    <h2 className="font-extrabold text-[8vw] leading-[10vw]">{firstName}<br/>{lastName}</h2>
                </div>
                <Image src="/dashboardPerson.svg" alt="outline image of a person looking at flashcards" width={147} height={164} className="absolute right-0 bottom-0 w-[35vw]"></Image>
            </div>
            <div className="col-span-1 row-span-1 row-start-2 col-start-1 rounded-[8vw] border-1 blue-to-white aspect-square flex flex-col items-center justify-center p-[3vw]">
                <h3 className="font-bold leading-[5vw]">Pending Tasks:</h3>
                <h3 className="font-bold text-[8vw]">{pendingLength}</h3>
            </div>
            <div className="col-span-1 row-span-1 row-start-2 col-start-2 rounded-[8vw] border-1 purple-to-pink aspect-square flex flex-col items-center justify-center p-[3vw]">
                <h3 className="font-bold leading-[5vw]">Due Today:</h3>
                <h3 className="font-bold text-[8vw]">{dueTodayLength}</h3>
            </div>
            <div className="col-span-1 row-span-1 row-start-2 col-start-3 rounded-[8vw] border-1 blue-to-purple aspect-square flex flex-col items-center justify-center p-[3vw]">
                <h3 className="font-bold leading-[5vw]">Overdue Tasks:</h3>
                <h3 className="font-bold text-[8vw]">{overdueLength}</h3>
            </div>
        </div>
    )
}