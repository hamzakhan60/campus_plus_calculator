import React from "react";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import AssessmentSection from "./AssesmentSection"; // keep your existing AssessmentSection
import CourseResult from "./CourseResult";

const CourseCard = ({
    course,
    courses,
    toggleCourse,
    removeCourse,
    updateCourse,
    addAssessmentRow,
    removeAssessmentRow,
    updateAssessment,
    getCourseDisplayName,
    calculateCourseGPA,
}) => {
    return (
        <div
            key={course.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
        >
            {/* Course Header - Always Visible */}
            <div
                className={`p-3 sm:p-4 cursor-pointer transition-all duration-200 ${course.isExpanded
                        ? "bg-[#1E1F4A] text-white"
                        : "bg-[#1E1F4A] hover:bg-[#2E2F5A] text-gray-300"
                    }`}
                onClick={() => toggleCourse(course.id)}
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        {course.isExpanded ? (
                            <ChevronUp size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                        ) : (
                            <ChevronDown size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                        )}
                        <h2
                            className={`text-sm sm:text-xl font-semibold truncate ${!course.isExpanded && course.subjectName ? "text-white" : ""
                                }`}
                        >
                            {getCourseDisplayName(course)}
                            {course.creditHours && ` (${course.creditHours} CH)`}
                            {course.hasLab && " 🧪"}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {!course.isExpanded && (
                            <span className="text-xs sm:text-sm opacity-75 hidden sm:block">
                                Click to expand
                            </span>
                        )}
                        {courses.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeCourse(course.id);
                                }}
                                className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1 transition-colors text-xs sm:text-sm"
                            >
                                <X size={12} className="sm:w-4 sm:h-4" />{" "}
                                <span className="hidden sm:inline">Remove</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Course Content - Expandable */}
            {course.isExpanded && (
                <div className="p-3 sm:p-6">
                    {/* Course Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                Subject Name
                            </label>
                            <input
                                type="text"
                                value={course.subjectName}
                                onChange={(e) =>
                                    updateCourse(course.id, "subjectName", e.target.value)
                                }
                                className="w-full px-2 sm:px-3 py-2 border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                placeholder="Enter subject name"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                Credit Hours
                            </label>
                            <input
                                type="number"
                                value={course.creditHours}
                                onChange={(e) =>
                                    updateCourse(course.id, "creditHours", e.target.value)
                                }
                                className="w-full px-2 sm:px-3 py-2 border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                placeholder="Enter credit hours"
                            />
                        </div>
                        <div className="flex items-center pl-0 sm:pl-2 pt-4 sm:pt-8">
                            <input
                                type="checkbox"
                                id={`hasLab-${course.id}`}
                                checked={course.hasLab}
                                onChange={(e) =>
                                    updateCourse(course.id, "hasLab", e.target.checked)
                                }
                                className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                            />
                            <label
                                htmlFor={`hasLab-${course.id}`}
                                className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-2"
                            >
                                Has Lab
                            </label>
                        </div>
                    </div>

                    {/* Theory Section */}
                    <AssessmentSection
                        course={course}
                        section="theory"
                        sectionName="Theory Section"
                        addAssessmentRow={addAssessmentRow}
                        removeAssessmentRow={removeAssessmentRow}
                        updateAssessment={updateAssessment}
                    />

                    {/* Lab Section - Only show if hasLab is true */}
                    {course.hasLab && (
                        <AssessmentSection
                            course={course}
                            section="lab"
                            sectionName="Lab Section"
                            addAssessmentRow={addAssessmentRow}
                            removeAssessmentRow={removeAssessmentRow}
                            updateAssessment={updateAssessment}
                        />
                    )}

                    <CourseResult result={calculateCourseGPA(course).toFixed(2)} title={"GPA"} />
                    
                </div>
            )}
        </div>
    );
};

export default CourseCard;
