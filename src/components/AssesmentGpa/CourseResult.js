import React from "react";
import { calculateCourseGPA, calculateCGPA } from "@/utils/gpa_assesment";

const CourseResult = ({ result,title }) => {
  return (
    <div className="mt-2 flex justify-center sm:justify-end">
      <div className="relative rounded-full p-2 shadow-2xl">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 sm:border-8 border-gray-200 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold text-gray-800">
              {result}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseResult;
