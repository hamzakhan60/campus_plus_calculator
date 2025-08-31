import RoomFinder from "@/components/room-finder"

export const metadata = {
  title: "COMSATS Room Finder - Find Available Rooms | COMSATS PLUS",
  description:
    "Find available rooms in real-time at COMSATS University Lahore. Search by time, block, and get live availability status for study sessions and makeup classes.",
  keywords:
    "COMSATS Room Finder, University Rooms, Available Rooms, Study Rooms, COMSATS Lahore, Real-time Availability",
  openGraph: {
    title: "COMSATS Room Finder - Find Available Rooms | COMSATS PLUS",
    description:
      "Find available rooms in real-time at COMSATS University Lahore. Perfect for study sessions and makeup classes.",
    url: "https://cuiplus.com/room-finder",
    type: "website",
  },
}

export default function RoomFinderPage() {
  return <RoomFinder />
}
