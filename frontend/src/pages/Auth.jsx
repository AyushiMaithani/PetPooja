import { useState } from "react";
import restaurant from '../assets/images/restaurant.jpg';
import logo from '../assets/images/logo.png'; 
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Auth = () => {
  const[isRegister, setIsRegister] = useState(false)
  
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section */}
      <div className="w-1/2 relative flex items-center justify-center bg-cover">
        {/* BG Image */}
        <img className="h-[100vh] w-full " src={restaurant} alt="Restaurant Image" />
        <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>

      {/* Right Section */}
      <div className="w-1/2 min-h-screen bg-[#1a1a1a] py-4 px-12"> 
        <div className="flex flex-col items-center gap-2">
          <img className="h-[5vh] " src={logo} alt="Logo" />
          <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">PetPooja</h1>
        </div>
        <h2 className="text-4xl text-center mt-2 font-semibold text-yellow-400 mb-10">
          {isRegister ? "Employee Registration" : "Employee Login"}
        </h2>

        {/*Component*/}
        {isRegister ? <Register /> : <Login />}


        <div className="flex justify-center mt-6">
          <p className="text-sm text-[#ababab]">
           {isRegister ? "Already have an account? " : "Don't have an account? "}
            <a onClick={()=>setIsRegister(!isRegister)} href="#" className="text-yellow-400">
              {isRegister ? "Sign in" : "Sign up"}
            </a>
          </p>
        </div>
      </div>
  </div>
  );
}

export default Auth;
