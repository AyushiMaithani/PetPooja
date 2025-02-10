import React, { useEffect } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdLibraryAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItems } from "../../redux/slices/cartSlice";
import { useRef } from "react";

const CartInfo = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const scrollRef = useRef();

  useEffect(() => {
    if(scrollRef.current){
     scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
     })
    }
  }
, [cartData]);

  return (
    <div className="px-4 py-2">
      <h1 className="text-lg text-[#e4e4e4] font-semibold tracking-wide">
        Order Details
      </h1>
      <div className="mt-4 overflow-y-scroll scrollbar-hide h-[260px]" ref={scrollRef}>
        {cartData.length === 0 ? (
          <p className="text-[#ababab] text-sm h-[280px] flex  justify-center items-center">
            Your Cart is Empty.Start Adding Items
          </p>
        ) : (
          cartData.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-[#ababab] font-semibold tracking-wide text-md">
                    {item.name}
                  </h1>
                  <p className="text-[#ababab] font-semibold">
                    x{item.quantity}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <RiDeleteBin2Fill
                      onClick={() => dispatch(removeItems(item.id))}
                      className="text-[#ababab] cursor-pointer"
                      size={20}
                    />
                    <MdLibraryAdd
                      className="text-[#ababab] cursor-pointer"
                      size={20}
                    />
                  </div>
                  <p className="text-[#f5f5f5] text-md font-bold">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartInfo;
