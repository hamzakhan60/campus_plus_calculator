export function getCurrentTimeSlot() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()

  // Round down to nearest 30-minute interval
  const roundedMinutes = minutes < 30 ? "00" : "30"
  const timeSlot = `${hours.toString().padStart(2, "0")}:${roundedMinutes}`
  console.log("Current time slot:", timeSlot)
  return timeSlot
}

export function formatTo12Hour(time24) {
  const [hours, minutes] = time24.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
}

export function getTimeRange(startTime, endTime) {
  return `${formatTo12Hour(startTime)} - ${formatTo12Hour(endTime)}`
}

export function getNext3TimeSlots(startTime) {
  const [hours, minutes] = startTime.split(":").map(Number)
  const slots = []

  let currentHour = hours
  let currentMinute = minutes

  for (let i = 0; i < 3; i++) {
    const currentSlot = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`

    // Calculate next slot for range
    let nextMinute = currentMinute + 30
    let nextHour = currentHour
    if (nextMinute >= 60) {
      nextMinute = 0
      nextHour += 1
    }
    const nextSlot = `${nextHour.toString().padStart(2, "0")}:${nextMinute.toString().padStart(2, "0")}`

    slots.push({
      start: currentSlot,
      end: nextSlot,
      range: getTimeRange(currentSlot, nextSlot),
    })

    currentMinute = nextMinute
    currentHour = nextHour
  }

  console.log("Next 3 time slots from", startTime, ":", slots)
  return slots
}

export function getCurrentDay() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const currentDay = days[new Date().getDay()]
  console.log("Current day:", currentDay)
  return currentDay
}

export function isUniversityHours() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const currentTime = hours * 60 + minutes

  const startTime = 8 * 60 + 30 // 8:30
  const endTime = 20 * 60 + 30 // 20:30

  const isWithinHours = currentTime >= startTime && currentTime <= endTime
  console.log("Is university hours:", isWithinHours, "Current time:", `${hours}:${minutes}`)
  return isWithinHours
}

export function getTimeSlotsBetween(startTime, endTime) {
  console.log("Getting time slots between:", startTime, "and", endTime)

  const [startHours, startMinutes] = startTime.split(":").map(Number)
  const [endHours, endMinutes] = endTime.split(":").map(Number)

  const slots = []
  let currentHour = startHours
  let currentMinute = startMinutes

  const startTimeInMinutes = startHours * 60 + startMinutes
  const endTimeInMinutes = endHours * 60 + endMinutes

  // If end time is before start time, use default 1.5 hour range
  if (endTimeInMinutes <= startTimeInMinutes) {
    console.warn("End time is before or equal to start time. Using default 1.5 hour range.")
    for (let i = 0; i < 3; i++) {
      slots.push(`${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`)

      currentMinute += 30
      if (currentMinute >= 60) {
        currentMinute = 0
        currentHour += 1
      }

      if (currentHour > 20 || (currentHour === 20 && currentMinute > 30)) {
        break
      }
    }
  } else {
    while (true) {
      const currentTimeInMinutes = currentHour * 60 + currentMinute
      if (currentTimeInMinutes >= endTimeInMinutes) break

      slots.push(`${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`)

      currentMinute += 30
      if (currentMinute >= 60) {
        currentMinute = 0
        currentHour += 1
      }

      if (currentHour > 20 || (currentHour === 20 && currentMinute > 30)) {
        break
      }
    }
  }

  console.log("Generated time slots:", slots)
  return slots
}

export function getDefaultEndTime(startTime) {
  const [hours, minutes] = startTime.split(":").map(Number)
  let endHour = hours + 1
  let endMinute = minutes + 30

  if (endMinute >= 60) {
    endMinute = endMinute - 60
    endHour += 1
  }

  if (endHour > 20 || (endHour === 20 && endMinute > 30)) {
    endHour = 20
    endMinute = 30
  }

  return `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`
}
