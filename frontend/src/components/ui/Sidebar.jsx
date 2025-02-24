"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaStar,
  FaCalendarCheck,
  FaTimesCircle,
  FaExclamationTriangle,
  FaPlane,
  FaBars,
} from "react-icons/fa";

const MENU_ITEMS = [
  { icon: FaStar, label: "Interested", href: "/mails/interested" },
  { icon: FaCalendarCheck, label: "Meetings", href: "/mails/meeting-booked" },
  { icon: FaTimesCircle, label: "Not Interested", href: "/mails/not-interested" },
  { icon: FaExclamationTriangle, label: "Spam", href: "/mails/spam" },
  { icon: FaPlane, label: "Out of Office", href: "/mails/out-of-office" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
    

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 bg-[#1a1a2e] text-white p-2 rounded-full shadow-md"
        >
          <FaBars className="text-xl" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 pt-10 left-0 h-screen bg-gray-800 text-white shadow-lg transition-all duration-300 z-40 ${
          isOpen ? "w-56" : "w-20"
        } ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}`}
      >
        <nav className="flex flex-col h-full p-4">
          <div className="flex-grow space-y-4">
            {MENU_ITEMS.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-[#e94560]"
              >
                <item.icon className="text-xl" />
                <span className={`text-lg font-medium ${isOpen ? "block" : "hidden"}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
