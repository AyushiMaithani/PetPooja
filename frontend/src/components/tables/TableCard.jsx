import React from "react";
import { color } from "../../utils";
import { useNavigate } from "react-router-dom";

const TableCard = ({ name, status, initials }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (status === "Booked") return;
    navigate("/menu");
  };
  return (
    <div
      onClick={handleClick}
      className="w-[300px] hover:bg-[#2c2c2c] bg-[#262626] p-4 rounded-lg cursor-pointer"
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">{name}</h1>
        <p
          className={`${
            status === "Booked"
              ? "text-green-600 bg-[#2e4a40]"
              : "bg-[#664a04] text-white"
          } px-2 py-1 rounded-lg`}
        >
          {status}
        </p>
      </div>
      <div className="flex items-center justify-center mt-5 mb-7">
        <h1
          style={{ backgroundColor: color() }}
          className={` text-white rounded-full p-10 text-2xl h-12 w-12 flex items-center justify-center`}
        >
          {initials}
        </h1>
      </div>
      <p class="text-[#ababab] text-xs">
        Seats: <span class="text-[#f5f5f5]">4</span>
      </p>
    </div>
  );
};

export default TableCard;
