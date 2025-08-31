"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import {
  getCurrentTimeSlot,
  getTimeSlotsBetween,
  getCurrentDay,
  isUniversityHours,
  getDefaultEndTime,
  formatTo12Hour,
  getTimeRange,
} from "@/lib/utils/time"
import { DAYS, TIME_SLOTS, BLOCKS } from "@/lib/constants"
import { CustomSelect } from "./common/custom-select"
import { CustomInput } from "./common/custom-input"
import {
  Search,
  RefreshCw,
  MapPin,
  Clock,
  Calendar,
  Filter,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

export default function RoomFinder() {
  const [roomData, setRoomData] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    selectedDay: getCurrentDay(),
    selectedStartTime: getCurrentTimeSlot(),
    selectedEndTime: getDefaultEndTime(getCurrentTimeSlot()),
    selectedRoom: "",
    selectedBlock: "all",
  })

  const supabase = createClient()

  const fetchRoomData = useCallback(async () => {
    try {
      console.log("=== Starting fetchRoomData ===")
      console.log("Current filters:", filters)

      setLoading(true)
      setError(null)

      const currentDay = filters.selectedDay || getCurrentDay()
      const startTime = filters.selectedStartTime || getCurrentTimeSlot()
      const endTime = filters.selectedEndTime || "10:00"

      console.log("Using day:", currentDay, "start time:", startTime, "end time:", endTime)

      const timeSlots = getTimeSlotsBetween(startTime, endTime)
      console.log("Time slots to query:", timeSlots)

      if (timeSlots.length === 0) {
        console.warn("No time slots generated!")
        setRoomData([])
        return
      }

      const dbTimeSlots = timeSlots.flatMap((slot) => [`${slot}:00`, slot.replace(/^0/, "")])
      console.log("Database time slots (multiple formats):", dbTimeSlots)

      let query = supabase.from("timetable").select("*").eq("day", currentDay).in("time", dbTimeSlots)

      if (filters.selectedRoom && filters.selectedRoom.trim() !== "") {
        console.log("Applying room filter:", filters.selectedRoom)
        query = query.eq("room", filters.selectedRoom.trim())
      }

      if (filters.selectedBlock && filters.selectedBlock !== "all" && filters.selectedBlock !== "") {
        console.log("Applying block filter:", filters.selectedBlock)
        query = query.like("room", `${filters.selectedBlock}%`)
      }

      console.log("Executing query...")
      const { data, error: queryError } = await query

      if (queryError) {
        console.error("Supabase query error:", queryError)
        throw queryError
      }

      console.log("Raw data from Supabase:", data)
      console.log("Number of records fetched:", data?.length || 0)

      if (!data || data.length === 0) {
        console.warn("No data returned from query")
        setRoomData([])
        return
      }

      const roomMap = new Map()

      data.forEach((slot) => {
        console.log("Processing slot:", slot)

        if (!roomMap.has(slot.room)) {
          roomMap.set(slot.room, {
            room: slot.room,
            slots: [],
            hasAvailableSlot: false,
            availabilityStatus: "occupied",
            availableSlots: 0,
            totalSlots: 0,
          })
        }

        const roomData = roomMap.get(slot.room)
        roomData.slots.push({
          time: slot.time.substring(0, 5),
          occupied: slot.occupied,
        })
      })

      console.log("Room map after grouping:", roomMap)

      const roomArray = Array.from(roomMap.values()).map((room) => {
        const availableSlots = room.slots.filter((slot) => !slot.occupied).length
        const totalSlots = room.slots.length

        let availabilityStatus = "occupied"
        if (availableSlots === totalSlots) {
          availabilityStatus = "available"
        } else if (availableSlots > 0) {
          availabilityStatus = "partial"
        }

        // Create time ranges for slots
        const slotsWithRanges = room.slots.map((slot, index) => {
          const [hours, minutes] = slot.time.split(":").map(Number)
          let nextMinute = minutes + 30
          let nextHour = hours
          if (nextMinute >= 60) {
            nextMinute = 0
            nextHour += 1
          }
          const endTime = `${nextHour.toString().padStart(2, "0")}:${nextMinute.toString().padStart(2, "0")}`

          return {
            ...slot,
            range: getTimeRange(slot.time, endTime),
          }
        })

        return {
          ...room,
          hasAvailableSlot: availableSlots > 0,
          availabilityStatus,
          availableSlots,
          totalSlots,
          slots: slotsWithRanges.sort((a, b) => a.time.localeCompare(b.time)),
        }
      })

      console.log("Room array after processing:", roomArray)

      roomArray.sort((a, b) => {
        if (a.availabilityStatus === "available" && b.availabilityStatus !== "available") return -1
        if (a.availabilityStatus !== "available" && b.availabilityStatus === "available") return 1
        if (a.availabilityStatus === "partial" && b.availabilityStatus === "occupied") return -1
        if (a.availabilityStatus === "occupied" && b.availabilityStatus === "partial") return 1
        return a.room.localeCompare(b.room)
      })

      console.log("Final sorted room array:", roomArray)
      setRoomData(roomArray)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error in fetchRoomData:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setLoading(false)
      console.log("=== fetchRoomData completed ===")
    }
  }, [filters, supabase])

  useEffect(() => {
    console.log("Component mounted, fetching data")
    fetchRoomData()

    const interval = setInterval(
      () => {
        if (isUniversityHours()) {
          console.log("Auto-refreshing data...")
          fetchRoomData()
        } else {
          console.log("Outside university hours, skipping auto-refresh")
        }
      },
      30 * 60 * 1000,
    )

    return () => {
      console.log("Cleaning up interval")
      clearInterval(interval)
    }
  }, [fetchRoomData])

  const handleFilterChange = (key, value) => {
    console.log("Filter changed:", key, "=", value)
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    console.log("Resetting filters")
    const currentTime = getCurrentTimeSlot()
    const newFilters = {
      selectedDay: getCurrentDay(),
      selectedStartTime: currentTime,
      selectedEndTime: getDefaultEndTime(currentTime),
      selectedRoom: "",
      selectedBlock: "all",
    }
    console.log("New filters:", newFilters)
    setFilters(newFilters)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "partial":
        return "bg-yellow-500"
      case "occupied":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Available"
      case "partial":
        return "Partially Available"
      case "occupied":
        return "Occupied"
      default:
        return "Unknown"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "available":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "partial":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "occupied":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#1E1F4A] to-blue-600 rounded-xs flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1E1F4A]">COMSATS Room Finder</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Find available rooms in real-time across COMSATS University Lahore campus. Perfect for study sessions,
              makeup classes, and group meetings.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-medium">Live Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Filters Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xs border border-gray-200 shadow-sm mb-8"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Filter className="w-5 h-5 text-[#1E1F4A]" />
                <h2 className="text-xl font-bold text-[#1E1F4A]">Search Filters</h2>
              </div>
              <p className="text-gray-600 font-medium">
                Customize your search to find the perfect room for your needs.
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-[#1E1F4A]">
                    <Calendar className="w-4 h-4" />
                    <span>Day</span>
                  </label>
                  <CustomSelect
                    value={filters.selectedDay}
                    onValueChange={(value) => handleFilterChange("selectedDay", value)}
                    options={DAYS}
                    placeholder="Select day"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-[#1E1F4A]">
                    <Clock className="w-4 h-4" />
                    <span>Start Time</span>
                  </label>
                  <CustomSelect
                    value={filters.selectedStartTime}
                    onValueChange={(value) => handleFilterChange("selectedStartTime", value)}
                    options={TIME_SLOTS.map((time) => ({ value: time, label: formatTo12Hour(time) }))}
                    placeholder="Start time"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-[#1E1F4A]">
                    <Clock className="w-4 h-4" />
                    <span>End Time</span>
                  </label>
                  <CustomSelect
                    value={filters.selectedEndTime}
                    onValueChange={(value) => handleFilterChange("selectedEndTime", value)}
                    options={TIME_SLOTS.map((time) => ({ value: time, label: formatTo12Hour(time) }))}
                    placeholder="End time"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-[#1E1F4A]">
                    <MapPin className="w-4 h-4" />
                    <span>Block</span>
                  </label>
                  <CustomSelect
                    value={filters.selectedBlock}
                    onValueChange={(value) => handleFilterChange("selectedBlock", value)}
                    options={[
                      { value: "all", label: "All Blocks" },
                      ...BLOCKS.map((block) => ({ value: block, label: `Block ${block}` })),
                    ]}
                    placeholder="All blocks"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-[#1E1F4A]">
                    <Search className="w-4 h-4" />
                    <span>Specific Room</span>
                  </label>
                  <CustomInput
                    value={filters.selectedRoom}
                    onChange={(e) => handleFilterChange("selectedRoom", e.target.value)}
                    placeholder="e.g., A-2, N-101"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={fetchRoomData}
                  disabled={loading}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#1E1F4A] to-blue-600 text-white font-semibold rounded-xs hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <motion.div
                    animate={loading ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 1, repeat: loading ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </motion.div>
                  <span>{loading ? "Searching..." : "Search Rooms"}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetFilters}
                  className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-[#1E1F4A] text-[#1E1F4A] font-semibold rounded-xs hover:bg-[#1E1F4A] hover:text-white transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Filters</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                label: "Available Rooms",
                count: roomData.filter((r) => r.availabilityStatus === "available").length,
                color: "bg-green-500",
                textColor: "text-green-600",
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
                icon: CheckCircle,
              },
              {
                label: "Partially Available",
                count: roomData.filter((r) => r.availabilityStatus === "partial").length,
                color: "bg-yellow-500",
                textColor: "text-yellow-600",
                bgColor: "bg-yellow-50",
                borderColor: "border-yellow-200",
                icon: AlertCircle,
              },
              {
                label: "Occupied Rooms",
                count: roomData.filter((r) => r.availabilityStatus === "occupied").length,
                color: "bg-red-500",
                textColor: "text-red-600",
                bgColor: "bg-red-50",
                borderColor: "border-red-200",
                icon: XCircle,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${stat.bgColor} ${stat.borderColor} rounded-xs p-6 border-2`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xs flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.count}</div>
                </div>
                <div className={`font-semibold ${stat.textColor}`}>{stat.label}</div>
                <div className="text-sm text-gray-600 font-medium mt-1">
                  {roomData.length > 0 ? `${Math.round((stat.count / roomData.length) * 100)}% of total` : "No data"}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Room Results */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xs p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4" />
                    <div className="h-4 bg-gray-200 rounded mb-6" />
                    <div className="space-y-3">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-12 bg-gray-200 rounded" />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : roomData.length > 0 ? (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {roomData.map((room, index) => (
                  <motion.div
                    key={room.room}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-xs p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#1E1F4A] mb-2">{room.room}</h3>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(room.availabilityStatus)}
                          <span className="text-sm font-semibold text-gray-700">
                            {getStatusText(room.availabilityStatus)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#1E1F4A]">
                          {room.availableSlots}/{room.totalSlots}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">Available Slots</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 font-medium mb-3 flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {filters.selectedDay === "Mo"
                            ? "Monday"
                            : filters.selectedDay === "Tu"
                              ? "Tuesday"
                              : filters.selectedDay === "We"
                                ? "Wednesday"
                                : filters.selectedDay === "Th"
                                  ? "Thursday"
                                  : "Friday"}
                        </span>
                        <Clock className="w-4 h-4 ml-4" />
                        <span>
                          {formatTo12Hour(filters.selectedStartTime)} - {formatTo12Hour(filters.selectedEndTime)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {room.slots.map((slot, slotIndex) => (
                        <motion.div
                          key={slot.time}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: slotIndex * 0.05 }}
                          className={`p-3 rounded-xs border-2 transition-all duration-200 ${
                            slot.occupied
                              ? "bg-red-50 border-red-200 text-red-800"
                              : "bg-green-50 border-green-200 text-green-800"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{slot.range}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium">{slot.occupied ? "Occupied" : "Available"}</span>
                              <div
                                className={`w-3 h-3 rounded-full ${slot.occupied ? "bg-red-500" : "bg-green-500"}`}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-[#1E1F4A] mb-4">No Rooms Found</h3>
                <p className="text-gray-600 mb-6 font-medium max-w-md mx-auto">
                  We couldn't find any rooms matching your criteria. Try adjusting your filters or search for a
                  different time slot.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetFilters}
                  className="px-6 py-3 bg-gradient-to-r from-[#1E1F4A] to-blue-600 text-white font-semibold rounded-xs hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
    </div>
  )
}
