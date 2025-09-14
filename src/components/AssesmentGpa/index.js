import { Plus} from 'lucide-react';
import { useCourses } from "@/hooks/useCourses";
import {
    calculateCourseGPA,
    calculateCGPA,
} from '@/utils/gpa_assesment';
import CourseCard from './CourseCard';
import CourseResult from './CourseResult';

const AssesmentGpa = () => {
   const {
    courses,
    addCourse,
    toggleCourse,
    updateCourse,
    updateAssessment,
    addAssessmentRow,
    removeAssessmentRow,
    removeCourse,
  } = useCourses();




    const getCourseDisplayName = (course) => {
        return course.subjectName || 'Untitled Course';
    };

    return (
        <div className="max-w-6xl mx-auto p-2 sm:p-4 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">

                <CourseResult result={calculateCGPA(courses).toFixed(2)} title={"CGPA"} />

                <button
                    onClick={addCourse}
                    className="order-1 sm:order-2 w-full sm:w-auto bg-[#1E1F4A] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm sm:text-base"
                >
                    <Plus size={16} /> Add Course
                </button>
            </div>

            <div className="space-y-4">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        courses={courses}
                        toggleCourse={toggleCourse}
                        removeCourse={removeCourse}
                        updateCourse={updateCourse}
                        addAssessmentRow={addAssessmentRow}
                        removeAssessmentRow={removeAssessmentRow}
                        updateAssessment={updateAssessment}
                        getCourseDisplayName={getCourseDisplayName}
                        calculateCourseGPA={calculateCourseGPA}
                    />

                ))}
            </div>
        </div>
    );
};

export default AssesmentGpa;