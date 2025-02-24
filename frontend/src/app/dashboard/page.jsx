"use client";
import React from "react";
import Navbar from "@/components/ui/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <Navbar />
      <p className="text-white"> This is Dashboard</p>
    </div>
  );
}
