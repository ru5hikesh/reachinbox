"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Logout from "@/components/auth/Logout";

const navItems = [
  { 
    title: "Inbox", 
    dropdown: [
      { label: "Interested", path: "/inbox/interested" },
      { label: "Meeting Booked", path: "/inbox/meeting-booked" },
      { label: "Not Interested", path: "/inbox/not-interested" },
      { label: "Spam", path: "/inbox/spam" },
      { label: "Out of Office", path: "/inbox/out-of-office" }
    ]
  },
  { 
    title: "Profile", 
    dropdown: [
      { label: "⚙️ Settings", path: "/settings" },
      { label: "↪ log out", component: Logout }
    ]
  },
  { title: "ru5hiksh", link: "https://x.com/ru5hiksh" },
];

export default function Navbar() {
  const [active, setActive] = useState(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActive(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownClick = (item) => {
    if (item.component) {
      return null; // Let the component handle its own click
    }
    router.push(item.path);
    setActive(null);
  };

  return (
    <nav ref={dropdownRef} className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-black text-white py-3 px-6 
      rounded-full shadow-lg flex space-x-6 border-2 border-gray-700">
      {navItems.map((item) => (
        <div key={item.title} className="relative">
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-white transition-colors duration-150 hover:text-blue-400"
            >
              {item.title}
            </a>
          ) : (
            <p className="cursor-pointer hover:opacity-80 transition-opacity" 
               onClick={() => setActive(active === item.title ? null : item.title)}>
              {item.title}
            </p>
          )}

          {item.dropdown && active === item.title && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white 
              rounded-lg shadow-lg border border-gray-700 w-48 z-50"
            >
              <div className="py-1">
                {item.dropdown.map((subItem) => (
                  subItem.component ? (
                    <subItem.component key={subItem.label} />
                  ) : (
                    <button
                      key={subItem.label}
                      onClick={() => handleDropdownClick(subItem)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-800 text-sm text-gray-200 
                      hover:text-white transition-colors duration-150"
                    >
                      {subItem.label}
                    </button>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </nav>
  );
}