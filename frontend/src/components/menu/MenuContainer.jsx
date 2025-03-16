import React, { useState } from "react";
import { menus } from "../../constants"; 
import { GrRadialSelected } from "react-icons/gr"; 
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]); 
  const [itemCount, setItemCount] = useState({}); 
  const dispatch=useDispatch();

  // Increment item count
  const increment = (id) => {
    setItemCount((prev) => {
      const newCount = prev[id] ? prev[id] + 1 : 1; // Default to 1 if it's the first increment
      return { ...prev, [id]: Math.min(newCount, 4) }; // Don't allow more than 4
    });
  };

  // Decrement item count
  const decrement = (id) => {
    setItemCount((prev) => {
      const newCount = prev[id] ? prev[id] - 1 : 0;
      return { ...prev, [id]: Math.max(newCount, 0) }; // Don't allow less than 0
    });
  };

  const handleAddToCart = (item) => {
    const currentItemCount = itemCount[item.id];
    if (itemCount==0) return;
  
    const { name, price } = item;
    const newItem = {
      id: Date.now(),
      name,
      pricePerQuantity: price,
      quantity: currentItemCount,
      price: price * currentItemCount
    };
dispatch(addItems(newItem));
setItemCount(0);
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id} // Fix key to use menu.id
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
              style={{ backgroundColor: menu.bgColor }} 
              onClick={() => setSelected(menu)} 
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {menu.icon} {menu.name} 
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
        {selected?.items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#333]"
          >
            <div className="flex items-start justify-between w-full ">
            <h1 className="text-[#f5f5f5] text-lg font-semibold">
              {item.name}
            </h1>
            <button onClick={()=>handleAddToCart(item)} className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg cursor-pointer">
              <FaShoppingCart size={20} />
            </button>
            </div>

            <div className="flex items-center justify-between w-full">
              <p className="text-[#f5f5f5] text-xl font-bold">₹{item.price}</p>
              <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg gap-6">
                <button
                  onClick={() => decrement(item.id)}
                  className="text-yellow-500 text-2xl"
                >
                  &minus;
                </button>
                <span className="text-white">{itemCount[item.id] || 0}</span>
                <button
                  onClick={() => increment(item.id)}
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
