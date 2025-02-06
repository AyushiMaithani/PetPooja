import React, { useState } from "react";
import { menus } from "../../constants"; 
import { GrRadialSelected } from "react-icons/gr"; 
import { FaShoppingCart } from "react-icons/fa";

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]); 
  const [itemCounts, setItemCounts] = useState({}); 

  // Increment item count
  const increment = (id) => {
    setItemCounts((prev) => {
      const newCount = prev[id] ? prev[id] + 1 : 1; // Default to 1 if it's the first increment
      return { ...prev, [id]: Math.min(newCount, 4) }; // Don't allow more than 4
    });
  };

  // Decrement item count
  const decrement = (id) => {
    setItemCounts((prev) => {
      const newCount = prev[id] ? prev[id] - 1 : 0;
      return { ...prev, [id]: Math.max(newCount, 0) }; // Don't allow less than 0
    });
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id} // Fix key to use menu.id
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
              style={{ backgroundColor: menu.bgColor }} // Set background color dynamically
              onClick={() => setSelected(menu)} // Set selected menu on click
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {menu.icon} {menu.name} {/* Render the icon and menu name */}
                </h1>
                {selected.id === menu.id && (
                  <GrRadialSelected className="text-white" size={20} />
                )}
              </div>
              <p className="text-[#ababab] text-sm font-semibold">
                {menu.items.length} Items
              </p>
            </div>
          );
        })}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
        {selected?.items.map((menu) => (
          <div
            key={menu.id}
            className="flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#333]"
          >
            <div className="flex items-start justify-between w-full ">
            <h1 className="text-[#f5f5f5] text-lg font-semibold">
              {menu.name}
            </h1>
            <button className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg cursor-pointer">
              <FaShoppingCart size={20} />
            </button>
            </div>

            <div className="flex items-center justify-between w-full">
              <p className="text-[#f5f5f5] text-xl font-bold">₹{menu.price}</p>
              <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg gap-6">
                <button
                  onClick={() => decrement(menu.id)}
                  className="text-yellow-500 text-2xl"
                >
                  &minus;
                </button>
                <span className="text-white">{itemCounts[menu.id] || 0}</span>
                <button
                  onClick={() => increment(menu.id)}
                  className="text-yellow-500 text-2xl"
                >
                  &#43;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuContainer;
