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
      <div className="flex flex-col min-h-[100dvh] px-[5vw]">
        <DashboardWidgets
          firstName={firstName}
          lastName={lastName}
          pendingLength={pendingTask.length}
          dueTodayLength={dueTodayTask.length}
          overdueLength={overdueTask.length}
        />
        <div className="flex flex-col items-center justify-center w-full gap-6">
          <div className="flex flex-row justify-between items-center w-full">
            <h3 className="font-bold text-[7vw]">Tasks</h3>
            <div className="relative">
              <select
                name="currentFilter"
                value={filter}
                onChange={handleFilter}
                className="bg-white border-1 py-[1vw] rounded-[5vw] text-center appearance-none pr-[10vw] pl-[5vw]"
              >
                <option value={"All"}>All</option>
                <option value={"Pending"}>Pending</option>
                <option value={"Overdue"}>Overdue</option>
                <option value={"Done"}>Done</option>
              </select>
              <Image
                src={"/dropdown.svg"}
                alt="Arrow down"
                width={30}
                height={30}
                className="absolute top-0 right-3 pointer-events-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full pb-20">
            {taskList.length > 0
              ? taskList.map((task) => <TaskCard key={task.id} task={task} />)
              : <p>No tasks available</p>}
          </div>
        </div>
      </div>
    </>
  );
}
