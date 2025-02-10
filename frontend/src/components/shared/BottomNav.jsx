import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomerName } from "../../redux/slices/customerSlice";

const BottomNav = () => {
  const navigate = useNavigate();
  const location= useLocation();
  const dispatch=useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const increment = () => {
    if (guestCount >= 6) return; // Prevent incrementing above 6
    setGuestCount((prev) => prev + 1);
  };

  // Decrement the guest count
  const decrement = () => {
    if (guestCount <= 0) return; // Prevent decrementing below 0
    setGuestCount((prev) => prev - 1);
  };

  const isActive = (path) => location.pathname===path;
  const handleCreateOrder = () => {
dispatch(setCustomerName({name, phone, guests:guestCount}));
    navigate("/tables")
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">
      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className={`flex items-center justify-center font-bold ${isActive("/") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[300px] rounded-[20px]`}
        >
        <FaHome className="inline mr-2" size={20} />
        <p>Home</p>
      </button>

      {/* Orders Button */}
      <button
        onClick={() => navigate("/orders")}
        className={`flex items-center justify-center font-bold ${isActive("/orders") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[300px] rounded-[20px]`}
      >
        <MdOutlineReorder className="inline mr-2" size={20} />
        <p>Orders</p>
      </button>

      {/* Tables Button */}
      <button
      disabled={isActive("/tables") ||  isActive("/menu")}
        onClick={() => navigate("/tables")}
        className={`flex items-center justify-center font-bold ${isActive("/tables") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[300px] rounded-[20px]`}
        >     
        <MdTableBar className="inline mr-2" size={20} />
        <p>Tables</p>
      </button>

      {/* More Button */}
      <button className="flex items-center justify-center text-[#ababab] w-[200px]">
        <CiCircleMore className="inline mr-2" size={20} />
        <p>More</p>
      </button>

      {/* Floating Dish Button */}
      <button
        onClick={openModal}
        className="absolute bottom-5 bg-[#F6B100] text-[#f5f5f5] rounded-full p-3 items-center"
      >
        <BiSolidDish size={30} />
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Customer Name
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            
              id=""
              name=""
              type="text"
              placeholder="Enter customer name"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Customer Phone
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
              id=""
              name=""
              type="number"
              placeholder="+91-9999999999"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">
            Guest
          </label>
          <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
            <button className="text-yellow-500 text-2xl" onClick={decrement}>
              &minus;
            </button>
            <span className="text-white">{guestCount} Person</span>
            <button className="text-yellow-500 text-2xl" onClick={increment}>
              &#43;
            </button>
          </div>
        </div>

        <button
          onClick={handleCreateOrder}
          className="w-full bg-[#F6B100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-yellow-700"
        >
          Create Order
        </button>
      </Modal>
    </div>
  );
};

export default BottomNav;
