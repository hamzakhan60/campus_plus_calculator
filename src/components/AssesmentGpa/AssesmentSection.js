import React from "react";
import { Plus, X } from "lucide-react";
import InputSection from "./InputSection";


const AssessmentSectionComponent =
    ({
        course,
        section,
        sectionName,
        addAssessmentRow,
        removeAssessmentRow,
        updateAssessment
    }) => (
        <div className="mb-4">
            <h4 className="font-semibold text-base sm:text-lg text-[#1E1F4A] border-gray-300 pb-2">
                {sectionName}
            </h4>

            {/* Quizzes and Assignments Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {/* Quizzes Section */}
                {section === "theory" && (
                    <div className="bg-white">
                        <div className="flex items-center justify-between mb-3">
                            <h5 className="font-medium text-sm sm:text-base text-gray-700 flex items-center gap-2">
                                Quizzes
                            </h5>
                            <button
                                onClick={() => addAssessmentRow(course.id, section, "quizzes")}
                                className="bg-[#1E1F4A] text-white px-2 py-1 rounded text-xs hover:bg-blue-600 flex items-center gap-1 transition-colors"
                            >
                                <Plus size={12} /> Add
                            </button>
                        </div>
                        {course[section].quizzes.map((quiz) => (
                            <InputSection
                                key={quiz.id}
                                category={quiz}
                                course={course}
                                section={section}
                                updateAssessment={updateAssessment}
                                removeAssessmentRow={removeAssessmentRow}
                                sectionType="quizzes"
                            />
                        ))}
                    </div>
                )}

                {/* Assignments Section */}
                <div className="bg-white">
                    <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-sm sm:text-base text-gray-700 flex items-center gap-2">
                            Assignments
                        </h5>
                        <button
                            onClick={() => addAssessmentRow(course.id, section, "assignments")}
                            className="bg-[#1E1F4A] text-white px-2 py-1 rounded text-xs hover:bg-green-600 flex items-center gap-1 transition-colors"
                        >
                            <Plus size={12} /> Add
                        </button>
                    </div>
                    {course[section].assignments.map((assignment) => (
                        <InputSection
                            key={assignment.id}
                            category={assignment}
                            course={course}
                            section={section}
                            updateAssessment={updateAssessment}
                            removeAssessmentRow={removeAssessmentRow}
                            sectionType="assignments"
                        />
                    ))}
                </div>
            </div>

            {/* Midterm and Final Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Midterm Section */}
                <div className="bg-white">
                    <h5 className="font-medium text-sm sm:text-base text-gray-700 mb-3 flex items-center gap-2">
                        Midterm
                    </h5>
                    <InputSection
                        category={course[section].midterm}
                        course={course}
                        section={section}
                        updateAssessment={updateAssessment}
                        sectionType="midterm"
                        isSingleObject={true} // new prop
                    />
                </div>

                {/* Final Term Section */}
                <div className="bg-white">
                    <h5 className="font-medium text-sm sm:text-base text-gray-700 mb-3 flex items-center gap-2">
                        Final Term
                    </h5>
                    <InputSection
                        category={course[section].finalterm}
                        course={course}
                        section={section}
                        updateAssessment={updateAssessment}
                        sectionType="finalterm"
                        isSingleObject={true} // new prop
                    />
                </div>
            </div>
        </div>
    )



const AssessmentSection = React.memo(AssessmentSectionComponent);
AssessmentSection.displayName = "AssessmentSection";

export default AssessmentSection;
