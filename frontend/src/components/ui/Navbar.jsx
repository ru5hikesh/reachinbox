"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { title: "Inbox", dropdown: ["Interested", "Meeting Booked", "Not Interested", "Spam", "Out of Office"] },
  { title: "Profile", dropdown: ["Settings"] },
  { title: "Contact", dropdown: ["My X Profile: ru5hiksh"] },
];

export default function Navbar() {
  const [active, setActive] = useState(null);

  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-black text-white py-3 px-6 
      rounded-full shadow-lg flex space-x-6 border-2 border-gray-700">
      {navItems.map((item) => (
        <div key={item.title} className="relative">
          <p 
            onMouseEnter={() => setActive(item.title)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            {item.title}
          </p>
          {active === item.title && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white p-3 rounded-lg shadow-lg border border-gray-700"
            >
              {item.dropdown.map((subItem) => (
                <Link key={subItem} href="#" className="block px-4 py-1 hover:bg-gray-800 rounded">
                  {subItem}
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </nav>
  );
}
