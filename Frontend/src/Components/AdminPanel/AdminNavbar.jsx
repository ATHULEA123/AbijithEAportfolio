import React, { useState } from "react";
import returnarrow from "../../assets/returnarrow.png";
import { FaBars } from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
const AdminNavbar = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center py-6 px-8">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold {`${isDarkMode ? 'text-black':'text-white'} ">ABIJITH</h1>
        </div>
        <div className="flex me-10">
          <ul className=" hidden lg:flex gap-6 items-center">
            <li>
              <a
                href="/AdminPanel/abijithea/3/10/1997"
                className="{`${isDarkMode ? 'text-black':'text-white'}  text-md font-medium hover:underline"
              >
                <Link to="/dashboard">  Home</Link>
              </a>
            </li>
            <li>
              <a
                href="/AllWorks"
                className="{`${isDarkMode ? 'text-black':'text-white'}  text-md font-medium hover:underline"
              >
                <Link to="/dashboard/works">All Works</Link>
              </a>
            </li>
            <li>
              <a
                href="/Aboutme"
                className="{`${isDarkMode ? 'text-black':'text-white'} e text-md font-medium hover:underline"
              >
             <Link to="/dashboard/profile">About Me</Link>
              </a>
            </li>
            <li>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="{`${isDarkMode ? 'text-black':'text-white'} e text-md font-medium hover:underline text-3xl"
              >
                <AiOutlineLogout />
              </button>
            </li>
          </ul>
          <button
            onClick={() => {
              setIsVisible(true);
            }}
            className="lg:hidden absolute right-10 top-7 me-8 text-xl"
            aria-label="Open Menu"
          >
            <FaBars
            />
          </button>
        </div>
        <div
          className={`fixed h-full bottom-0 right-0 top-0 overflow-hidden bg-white  transition-all duration-700 ease-in-out  z-40 ${isVisible ? "w-full" : "w-0"
            } `}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => {
                setIsVisible(false);
              }}
              className="flex items-center p-3 font-semibold"
            >
              <img src={returnarrow} alt="" className="w-7" />
              <p>Back</p>
            </div>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="" className="text-black text-base  py-2 pl-6 font-semibold ">
                  <Link to="/dashboard">  Home</Link>
                </a>
              </li>
              <li>
                <a href="" className="text-black text-base  py-2 pl-6 font-semibold">
                  <Link to="/dashboard/works">All Works</Link>
                </a>
              </li>
              <li>
                <a href="" className="text-black text-base  py-2 pl-6 font-semibold">
                  <Link to="/dashboard/profile">About Me</Link>
                </a>
              </li>
              <li>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="text-black text-base  py-2 pl-6 font-semibold">
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white md:pt-4 pt-2 md:pb-10 pb-5 md:px-12 px-6 rounded-lg shadow-lg">
            <div className="text-end relative md:top-[-8px] md:right-[-40px] right-[-12px]">
              <button
                onClick={() => setShowLogoutModal(false)}
                className=" md:text-2xl text-lg font-bold">
                <RxCross2 />
              </button>
            </div>
            <p className="md:text-lg text-sm font-medium md:mb-12 mb-6 text-black">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowLogoutModal(false)} className="px-4 py-2 bg-gray-300 rounded-md">
                No
              </button>
              <button onClick={() => navigate("/")} className="px-4 py-2 bg-red-600 text-white rounded-md">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminNavbar;