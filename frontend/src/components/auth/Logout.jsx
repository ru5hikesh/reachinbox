"use client";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear auth token
    router.push("/authentication"); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="block w-full text-left px-4 py-2 hover:bg-gray-800 text-sm text-gray-200 
      hover:text-white transition-colors duration-150"
    >
      ↪ log out
    </button>
  );
}
