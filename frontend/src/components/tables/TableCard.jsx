import React from "react";
import { getBgColor } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { FaLongArrowAltRight } from "react-icons/fa";
import { getInitials } from "../../utils";

const TableCard = ({id, name, status, initials,seats }) => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const handleClick = (name) => {
    if (status === "Booked") return;

    const table={tableId:id,tableNo:name};
    dispatch(updateTable({table}));
    navigate(`/menu`);
  };
  return (
    <div
      key={id}
      onClick={()=>handleClick(name)}
      className="w-[300px] h-[220px] hover:bg-[#2c2c2c] bg-[#262626] p-4 rounded-lg cursor-pointer"
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">
          Table <FaLongArrowAltRight className="text-[#ababab] ml-2 inline"/> {name} 
          </h1>
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
      <h1 className={`text-white rounded-full p-10 text-2xl h-12 w-12 flex items-center justify-center`} style={{backgroundColor : initials ? getBgColor() : "#1f1f1f"}} >{getInitials(initials) || "N/A"}</h1>
      </div>
      <p className="text-[#ababab] text-xs">
        Seats: <span className="text-[#f5f5f5]">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
