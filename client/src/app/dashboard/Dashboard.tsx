"use client"
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import TaskCard from "../../../components/TaskCard";
import DashboardWidgets from "../../../components/DashboardWidgets";
import { TaskContext } from "../../../context/TaskProvider";

type DashboardProp = {
    fullName: string | null;
};

export default function Dashboard({fullName}: DashboardProp) {


  const taskContext = useContext(TaskContext);
  if (!taskContext) return <p>Loading...</p>;

  const { taskList, pendingTask, dueTodayTask, overdueTask, filter, setFilter } = taskContext;

  const getNameLines = () => {
    if (!fullName) return ["Guest"];
    const parts = fullName.split(" ");
    return [parts[0], parts.slice(1).join(" ")];
  };
  const [firstName, lastName] = getNameLines();

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };




  return (
    <>
      <div className="flex flex-col xl:flex-row xl:max-w-[80rem] xl:min-h-[80dvh] xl:w-full xl:px-0 xl:h-[80dvh] xl:gap-[4rem] items-center px-[5vw] md:px-[2rem] md:max-w-[700px] justify-center">
        <DashboardWidgets
          firstName={firstName}
          lastName={lastName}
          pendingLength={pendingTask.length}
          dueTodayLength={dueTodayTask.length}
          overdueLength={overdueTask.length}
        />
        <div className="flex flex-col items-center xl:min-h-[40rem] max-h-[50dvh] w-full gap-6 xl:max-w-[50rem] xl:h-full">
          <div className="flex flex-row justify-between items-center w-full">
            <h3 className="font-bold text-[7vw] md:text-[3rem]">Tasks</h3>
            <div className="relative">
              <select
                name="currentFilter"
                value={filter}
                onChange={handleFilter}
                className="bg-white border-1 py-[1vw] rounded-[5vw] text-center appearance-none pr-[10vw] pl-[5vw] md:text-[1.25rem] md:py-[1rem] md:pl-[1rem] md:pr-[3rem]"
              >
                <option value={"All"} className="text:-[1.25rem]">All</option>
                <option value={"Pending"} className="text:-[1.25rem]">Pending</option>
                <option value={"Overdue"} className="text:-[1.25rem]">Overdue</option>
                <option value={"Done"} className="text:-[1.25rem]">Done</option>
              </select>
              <Image
                src={"/dropdown.svg"}
                alt="Arrow down"
                width={30}
                height={30}
                className="absolute top-0 right-3 md:w-[3rem] md:top-2 pointer-events-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full xl:h-full overflow-y-scroll no-scrollbar pb-20">
            {taskList.length > 0
              ? taskList.map((task) => <TaskCard key={task.id} task={task} />)
              : <p className="md:text-[1.5rem]">No tasks available</p>}
          </div>
        </div>
      </div>
    </>
  );
}
