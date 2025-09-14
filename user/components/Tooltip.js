import React from "react";
import { Info, AlertCircle, CheckCircle, HelpCircle } from "lucide-react";

const Tooltip = ({
  message,
  type = "info",
  position = "right",
  children,
  isVisible = true
}) => {
  if (!isVisible || !message) return children;

  // Styles for different types
  const typeClasses = {
    info: "bg-primary/60 text-white border-gray-600",
    error: "bg-red-900/60 text-white border-red-700",
    success: "bg-green-900 text-green-100 border-green-700",
    warning: "bg-yellow-900 text-yellow-100 border-yellow-700",
  };

  // Tooltip position classes
  const positionClasses = {
    top: "-top-6 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2",
    bottom: "-bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full mt-2",
    left: "top-1/2 -left-2 transform -translate-x-full -translate-y-1/2 mr-2",
    right: "-top-12 -right-5 transform translate-x-full -translate-y-1/2 ml-2",
  };

  // Arrow classes
  const arrowClasses = {
    top: "absolute w-2 h-2 rotate-45 bottom-0 left-1/2 -translate-x-1/2",
    bottom: "absolute w-2 h-2 rotate-45 top-0 left-1/2 -translate-x-1/2",
    left: "absolute w-2 h-2 rotate-45 right-0 top-1/2 -translate-y-1/2",
    right: "absolute w-2 h-2 rotate-45 left-0 top-1/2 -translate-y-1/2",
  };

  // Icons based on type
  const icons = {
    info: <Info size={12} className="text-blue-300 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />,
    error: <AlertCircle size={12} className="text-red-300 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />,
    success: <CheckCircle size={12} className="text-green-300 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />,
    warning: <HelpCircle size={12} className="text-yellow-300 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />,
  };

  return (
    <div className="relative inline-block">
      {children}
      <div
        className={`absolute z-50 px-2 py-1.5 text-xs sm:px-2.5 sm:py-2 sm:text-sm md:px-3 md:py-2 md:text-sm lg:text-base rounded-md sm:rounded-lg border w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 ${typeClasses[type]} ${positionClasses[position]} transition-all duration-300`}
      >
        <div className={`${arrowClasses[position]} ${typeClasses[type]}`}></div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {icons[type]}
          <span className="font-medium">{message}</span>
        </div>
      </div>
    </div>

  );
};

export default Tooltip;