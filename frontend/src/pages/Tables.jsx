import React, { useState,useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard"; 
import { tables } from "../constants";
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import { getTables } from "../https";
import { enqueueSnackbar } from "notistack";

const Tables = () => {

  useEffect(() => {
    document.title = "PetPooja | Tables"
  }, [])

  const [status, setStatus] = useState("all");
  const {data:resData,isError}=useQuery({
    queryKey:['tables'],
    queryFn:async()=>{
      return await getTables();
    },
    placeholderData:keepPreviousData,
  });

  if(isError){
    enqueueSnackbar("Something went wrong!",{variant:'error'});
  }

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden ">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider"> 
            Tables
          </h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg rounded-lg px-5 py-2 font-semibold ${status === "all" ? "bg-[#383838]" : ""}`}
          >
            All
          </button>

          <button
            onClick={() => setStatus("booked")}
            className={`text-[#ababab] text-lg rounded-lg px-5 py-2 font-semibold ${status === "booked" ? "bg-[#383838]" : ""}`}
          >
            Booked
          </button>

          
        </div>
      </div>
      <div className="px-16 py-4 flex flex-wrap gap-6 overflow-y-auto scrollbar-hide h-[calc(100vh-14rem)]">
      <div className="grid grid-cols-4 gap-5 px-10">
  {resData?.data.data.map((table) => {
    return (
      <TableCard
        key={table._id}
        id={table._id}
        name={table.tableNo} 
        status={table.status}
        initials={table?.currentOrder?.customerDetails?.name}
        seats={table.seats}
      />
    );
  })}
</div>
    
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
