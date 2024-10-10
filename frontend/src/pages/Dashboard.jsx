import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
 import { GoHome } from "react-icons/go";
import { BsTags, BsWallet, BsPerson, BsCalendar, BsTicketDetailed, BsFileBarGraph, BsChat } from "react-icons/bs";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdReviews } from "react-icons/md";
import logo from "../assets/logo.jpeg";
 const links = [
  { to: "/", label: "Dashboard", icon: GoHome },
  { to: "/order-list", label: "Order List", icon: BsTags },
  { to: "/order-details", label: "Order Details", icon: BsTicketDetailed },
  { to: "/customers", label: "Customers", icon: BsPerson },
  { to: "/analytics", label: "Analytics", icon: BsFileBarGraph },
  { to: "/reviews", label: "Reviews", icon: MdReviews },
  { to: "/foods", label: "Foods", icon: IoFastFoodOutline },
  { to: "/food-details", label: "Food Details", icon: BsTags },
  { to: "/calendar", label: "Calendar", icon: BsCalendar },
  { to: "/chat", label: "Chat", icon: BsChat },
  { to: "/wallet", label: "Wallet", icon: BsWallet },
];

const Dashboard = () => {
  const [open, setOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
 
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setOpen(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 

  return (
     
    <div className="flex">
      <div
        className={`fixed top-0 left-8 h-screen bg-white text-black transition-transform duration-300 z-20 ${
          open ? "translate-x-0" : "-translate-x-full"
        } w-44 ${isMobile ? "absolute" : ""}`}
      >
        <div className="flex justify-center border-gray-700 p-3">
          <img src={logo} alt="logo" className="w-[40px] md:w-[80px]" />
        </div>
        <nav className="pb-2">
          {links.map(({ to,label, icon: Icon }) => (
            
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex block text-center font-semibold border-gray-700 text-[12px] p-2 rounded-md transition-all ${
                    isActive
                      ? "bg-green-200  text-green-600"
                      : "text-black hover:text-green-600 hover:bg-green-200"
                  }`
                }
                onClick={() => isMobile && setOpen(false)}
              >
                <div className="justify-center mb-2 mr-3">
                  <Icon className="text-[18px]" />
                </div>
                {label}
              </NavLink>
           ))}
        </nav>
      </div>
      <div
        className={`flex-1 transition-all duration-300 ${open && !isMobile ? "ml-32" : "ml-0"} relative z-10`}
      >
      
       
        <main className="p-5 sm:p-7 md:p-10 bg-gray-200 min-h-screen relative z-0">
          <Outlet />
         </main>
      </div>
    </div>
  );
};

export default Dashboard;
