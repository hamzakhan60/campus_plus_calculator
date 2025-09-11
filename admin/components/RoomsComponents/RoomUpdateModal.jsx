"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { XCircle, CheckCircle, Ban } from "lucide-react";
import Button from "../ui/button";

export default function RoomUpdateModal({ slot, isOpen, onClose, onUpdated }) {
  const [updating, setUpdating] = useState(false);
  const supabase = createClient();

  const updateSlotStatus = async () => {
    console.log(slot);
    if (!slot) return;
    try {
      setUpdating(true);
      const { error } = await supabase
        .from("timetable")
        .update({ occupied: !slot.occupied })
        .eq("id", slot.id);
      console.log("Update response error:", error);

      if (error) throw error;

      onClose();
      onUpdated?.();
    } catch (err) {
      console.error("Error updating slot:", err.message);
    } finally {
      // setUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && slot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 hover:rotate-90 transition-transform duration-300"
            >
              <XCircle className="w-6 h-6 text-gray-500 hover:text-red-500" />
            </button>
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-[#1E1F4A]">Update Slot</h2>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-6 text-gray-700 text-lg">
              <p>
                <strong>Room:</strong> {slot.room}
              </p>
              <p>
                <strong>Day:</strong> {slot.day}
              </p>
              <p>
                <strong>Time:</strong> {slot.range}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    slot.occupied ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {slot.occupied ? "Occupied" : "Available"}
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={updateSlotStatus}
                disabled={updating}
                loading={updating}
                variant="primary"
                icon={slot.occupied ? CheckCircle : Ban}
              >
                <span className="whitespace-nowrap">
                  {slot.occupied ? "Mark as Available" : "Mark as Occupied"}
                </span>
              </Button>

              <div className="flex-1">
                <Button
                  onClick={onClose}
                  variant="secondary"
                  icon={XCircle}
                  className="w-full"
                >
                  <span className="whitespace-nowrap">Cancel</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
