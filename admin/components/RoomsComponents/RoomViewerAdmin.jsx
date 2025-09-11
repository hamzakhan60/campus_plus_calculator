"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { DAYS, TIME_SLOTS, BLOCKS } from "@/lib/constants"
import { CustomSelect } from "../common/custom-select"
import { CustomInput } from "../common/custom-input"
import { Filter, Search, RefreshCw } from "lucide-react"

export default function AdminTimetable() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [timetable, setTimetable] = useState({})
  const [filters, setFilters] = useState({
    selectedRoom: "n-1",
    selectedBlock: "N",
  })

  const supabase = createClient()

  const fetchTimetable = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase.from("timetable").select("*").eq("day", filters.selectedDay)

      if (filters.selectedRoom.trim() !== "") {
        query = query.eq("room", filters.selectedRoom.trim())
      }

      if (filters.selectedBlock !== "all") {
        query = query.like("room", `${filters.selectedBlock}%`)
      }

      const { data, error } = await query
      if (error) throw error

      // transform into timetable format
      const grouped = {}
      data.forEach((row) => {
        if (!grouped[row.room]) grouped[row.room] = {}
        grouped[row.room][row.time] = row.occupied
      })

      setTimetable(grouped)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filters, supabase])

  useEffect(() => {
    fetchTimetable()
  }, [fetchTimetable])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="p-6">
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8 p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Filter className="w-5 h-5 text-[#1E1F4A]" />
          <h2 className="text-xl font-bold text-[#1E1F4A]">Search Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CustomSelect
            value={filters.selectedDay}
            onValueChange={(value) => handleFilterChange("selectedDay", value)}
            options={DAYS}
            placeholder="Select day"
          />
          <CustomSelect
            value={filters.selectedBlock}
            onValueChange={(value) => handleFilterChange("selectedBlock", value)}
            options={[
              { value: "all", label: "All Blocks" },
              ...BLOCKS.map((block) => ({ value: block, label: `Block ${block}` })),
            ]}
          />
          <CustomInput
            value={filters.selectedRoom}
            onChange={(e) => handleFilterChange("selectedRoom", e.target.value)}
            placeholder="Search room e.g. N-1"
          />
        </div>

        <div className="mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={fetchTimetable}
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-[#1E1F4A] to-blue-600 text-white font-semibold rounded hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{loading ? "Loading..." : "Refresh"}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Timetable Table */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Room</th>
              {TIME_SLOTS.map((time) => (
                <th key={time} className="px-2 py-2 border text-xs">{time}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(timetable).map(([room, slots]) => (
              <tr key={room}>
                <td className="px-4 py-2 border font-bold">{room}</td>
                {TIME_SLOTS.map((time) => (
                  <td
                    key={`${room}-${time}`}
                    className={`px-2 py-2 border text-center ${
                      slots[time] ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}
                  >
                    {slots[time] ? "X" : "✓"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
