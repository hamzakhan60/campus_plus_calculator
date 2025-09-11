"use client"

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xs shadow-sm ${className}`}
    >
      {children}
    </div>
  )
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}
