import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion"

export default function Stats({ roomData }) {
  const total = roomData.length;
  const occupied = roomData.filter((r) => r.occupied).length;
  const free = total - occupied;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        {
          label: "Available Rooms",
          count: roomData.filter((r) => r.availabilityStatus === "available")
            .length,
          color: "bg-green-500",
          textColor: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          icon: CheckCircle,
        },
        {
          label: "Partially Available",
          count: roomData.filter((r) => r.availabilityStatus === "partial")
            .length,
          color: "bg-yellow-500",
          textColor: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          icon: AlertCircle,
        },
        {
          label: "Occupied Rooms",
          count: roomData.filter((r) => r.availabilityStatus === "occupied")
            .length,
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
            <div
              className={`w-12 h-12 ${stat.color} rounded-xs flex items-center justify-center`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className={`text-3xl font-bold ${stat.textColor}`}>
              {stat.count}
            </div>
          </div>
          <div className={`font-semibold ${stat.textColor}`}>{stat.label}</div>
          <div className="text-sm text-gray-600 font-medium mt-1">
            {roomData.length > 0
              ? `${Math.round((stat.count / roomData.length) * 100)}% of total`
              : "No data"}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
