import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a]">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <img src={logo} className="h-12 w-12" alt="logo" />
        <h1 className="text-lg font-semibold text-[#f5f5f5]">Petpooja</h1>
      </div>
      {/* SEARCHBAR */}
      <div
        className="flex items-center gap-4 bg-[#333] rounded-[15px] px-5 py-2 w-[500px]">
        <FaSearch className="text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Search"
          className="bg-[#333] outline-none text-[#f5f5f5]"
        />
      </div>
      {/* LOGGED IN USER DETAILS */}
      <div className="flex items-center gap-4">
        <div className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer">
          <FaBell className="text-[#f5f5f5] text-2xl" />
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-4xl" />
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] font-semibold">
              Justin Bieber
            </h1>
            <p className="text-xs text-[#ababab] font-medium">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
