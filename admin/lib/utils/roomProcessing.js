// utils/roomProcessing.js
import { getTimeRange } from "@/lib/utils/time";

export function processRoomData(data) {
  if (!data || data.length === 0) return [];

  const roomMap = new Map();

  data.forEach((slot) => {
    if (!roomMap.has(slot.room)) {
      roomMap.set(slot.room, {
        room: slot.room,
        slots: [],
        hasAvailableSlot: false,
        availabilityStatus: "occupied",
        availableSlots: 0,
        totalSlots: 0,
      });
    }

    const roomData = roomMap.get(slot.room);
    roomData.slots.push({
      id: slot.id,
      time: slot.time.substring(0, 5),
      occupied: slot.occupied,
      day: slot.day,
    });
  });

  const roomArray = Array.from(roomMap.values()).map((room) => {
    const availableSlots = room.slots.filter((s) => !s.occupied).length;
    const totalSlots = room.slots.length;

    let availabilityStatus = "occupied";
    if (availableSlots === totalSlots) availabilityStatus = "available";
    else if (availableSlots > 0) availabilityStatus = "partial";

    const slotsWithRanges = room.slots.map((slot) => {
      const [hours, minutes] = slot.time.split(":").map(Number);
      let nextMinute = minutes + 30;
      let nextHour = hours;
      if (nextMinute >= 60) {
        nextMinute = 0;
        nextHour += 1;
      }
      const endTime = `${nextHour.toString().padStart(2, "0")}:${nextMinute
        .toString()
        .padStart(2, "0")}`;

      return {
        ...slot,
        range: getTimeRange(slot.time, endTime),
      };
    });

    return {
      ...room,
      hasAvailableSlot: availableSlots > 0,
      availabilityStatus,
      availableSlots,
      totalSlots,
      slots: slotsWithRanges.sort((a, b) => a.time.localeCompare(b.time)),
    };
  });

  // Sort like before
  roomArray.sort((a, b) => {
    if (a.availabilityStatus === "available" && b.availabilityStatus !== "available") return -1;
    if (a.availabilityStatus !== "available" && b.availabilityStatus === "available") return 1;
    if (a.availabilityStatus === "partial" && b.availabilityStatus === "occupied") return -1;
    if (a.availabilityStatus === "occupied" && b.availabilityStatus === "partial") return 1;
    return a.room.localeCompare(b.room);
  });

  return roomArray;
}
