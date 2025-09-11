"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  RefreshCw,
  Calendar,
  Clock,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { CustomInput } from "../common/custom-input";
import { DAYS, TIME_SLOTS } from "../../lib/constants";
import { createClient } from "@/lib/supabase/client";
import RoomUpdateModal from "./RoomUpdateModal";

export default function AdminTimetable() {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!selectedRoom.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const data = await fetchTimetableData(selectedRoom);
      setRoomData(data);
      setLastUpdated(new Date());
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (selectedRoom.trim()) {
      fetchData();
    }
  }, [fetchData]);

  const resetSearch = () => {
    setSelectedRoom("");
    setRoomData([]);
  };

  const getSlotInfo = (room, day, time) => {
    const dbRecord = roomData.find(
      (item) =>
        item.room.toLowerCase() === room.toLowerCase() &&
        item.day === day &&
        item.time === time
    );

    if (dbRecord) {
      return {
        ...dbRecord,
        label: dbRecord.occupied ? "Occupied" : "Available",
      };
    }

    return null;
  };

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedSlot(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#1E1F4A] to-blue-600 flex items-center justify-center rounded">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1E1F4A]">
              Admin Timetable
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Search for a specific classroom to view its complete weekly
            schedule. Enter a room number like "A-2" or "N-1" to see detailed
            timetable information.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              {mounted && (
                <span className="font-medium">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Search Filter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xs border border-gray-200 shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Search className="w-5 h-5 text-[#1E1F4A]" />
              <h2 className="text-xl font-bold text-[#1E1F4A]">
                Search Specific Room
              </h2>
            </div>
            <p className="text-gray-600 font-medium">
              Enter the exact room number to view its complete timetable (e.g.,
              A-2, N-1, B-5).
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-[#1E1F4A]">
                <Search className="w-4 h-4" />
                <span>Room Number</span>
              </label>
              <CustomInput
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                placeholder="e.g., A-2, N-1, B-5"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchData}
                disabled={loading || !selectedRoom.trim()}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#1E1F4A] to-blue-600 text-white font-semibold rounded-xs hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50"
              >
                <motion.div
                  animate={loading ? { rotate: 360 } : { rotate: 0 }}
                  transition={{
                    duration: 1,
                    repeat: loading ? Number.POSITIVE_INFINITY : 0,
                    ease: "linear",
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                </motion.div>
                <span>{loading ? "Loading..." : "Search Room"}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetSearch}
                className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-[#1E1F4A] text-[#1E1F4A] font-semibold rounded-xs hover:bg-[#1E1F4A] hover:text-white transition-all duration-300"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Search</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Timetable Table */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div className="bg-white border border-gray-200 rounded-xs p-8 text-center">
              Loading...
            </motion.div>
          ) : selectedRoom && roomData.length > 0 ? (
            <motion.div className="bg-white border border-gray-200 rounded-xs shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-[#1E1F4A]">
                  Timetable (Room {selectedRoom})
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-2 py-3 bg-gray-50 text-sm font-bold text-[#1E1F4A] w-16">
                        CUI_Lahore
                      </th>
                      {TIME_SLOTS.map((slot, index) => (
                        <th
                          key={slot}
                          className="border border-gray-300 px-1 py-2 bg-gray-50 text-xs font-semibold text-[#1E1F4A] min-w-[80px] text-center"
                        >
                          <div className="text-xs">{index + 1}</div>
                          <div className="text-xs leading-tight">{slot}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DAYS.map((day) => (
                      <tr key={day.value}>
                        <td className="border border-gray-300 px-3 py-4 font-bold text-[#1E1F4A] bg-gray-50 text-center">
                          {day.value}
                        </td>
                        {TIME_SLOTS.map((slot) => {
                          const slotInfo = getSlotInfo(
                            selectedRoom,
                            day.value,
                            slot
                          );
                          return (
                            <td
                              key={`${day.value}-${slot}`}
                              className="border border-gray-300 p-1 text-center min-h-[80px] align-top cursor-pointer hover:bg-gray-50"
                              onClick={() => {
                                if (slotInfo)
                                  handleSlotClick({ ...slotInfo, range: slot });
                              }}
                            >
                              {slotInfo ? (
                                <div
                                  className={`rounded p-2 text-xs h-full flex items-center justify-center font-semibold ${
                                    slotInfo.occupied
                                      ? "bg-red-50 border border-red-200 text-red-700"
                                      : "bg-green-50 border border-green-200 text-green-700"
                                  }`}
                                >
                                  {slotInfo.label}
                                </div>
                              ) : (
                                <div className="h-full min-h-[60px]"></div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : selectedRoom && roomData.length === 0 ? (
            <motion.div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E1F4A] mb-4">
                No Data Found
              </h3>
              <p className="text-gray-600 mb-6 font-medium">
                No timetable data found for room "{selectedRoom}".
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>
      {/* Error Toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-xs shadow-lg border border-red-400 max-w-sm z-50"
          >
            <div className="flex items-start space-x-3">
              <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Error</div>
                <div className="text-sm opacity-90">{error}</div>
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-white hover:text-red-200 transition-colors"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <RoomUpdateModal
        slot={selectedSlot}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onUpdated={fetchData}
      />
      ;
    </div>
  );
}

const fetchTimetableData = async (room) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_timetable_by_room", {
    room_name: room,
  });
  console.log("Data Fetched From A Supabase Function:", data);

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  return data || [];
};
