"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Users, ClipboardList, RefreshCw } from "lucide-react";
import LastUpdated from "@/components/ui/LastUpdated";

export default function AdminHome() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans min-h-screen p-8 sm:p-20 bg-white text-[#1E1F4A] flex flex-col items-center gap-12">
      {/* Header */}
      <header className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-[#1E1F4A] to-blue-600 flex items-center justify-center rounded">
            <ClipboardList className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-gray-600 font-medium">
          Manage classrooms, check timetables, and monitor availability.
        </p>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
          <Users className="w-8 h-8 mx-auto text-blue-600 mb-3" />
          <h2 className="text-xl font-bold">62</h2>
          <p className="text-sm text-gray-600">Total Rooms</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
          <Calendar className="w-8 h-8 mx-auto text-green-600 mb-3" />
          <h2 className="text-xl font-bold">14</h2>
          <p className="text-sm text-gray-600">Classes Today</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
          <ClipboardList className="w-8 h-8 mx-auto text-red-600 mb-3" />
          <h2 className="text-xl font-bold">5</h2>
          <p className="text-sm text-gray-600">Pending Updates</p>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="max-w-4xl w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold">Recent Activity</h3>
          <div className="flex items-center text-sm text-gray-500">
            <LastUpdated/>
          </div>
        </div>
        <ul className="divide-y divide-gray-200">
          <li className="p-4 flex justify-between">
            <span className="font-medium">Room N-1 marked as Occupied</span>
            <span className="text-gray-500 text-sm">2 mins ago</span>
          </li>
          <li className="p-4 flex justify-between">
            <span className="font-medium">Class added in A-2</span>
            <span className="text-gray-500 text-sm">15 mins ago</span>
          </li>
          <li className="p-4 flex justify-between">
            <span className="font-medium">Timetable updated for D-118</span>
            <span className="text-gray-500 text-sm">1 hr ago</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
