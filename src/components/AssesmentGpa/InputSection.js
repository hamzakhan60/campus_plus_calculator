import { X } from "lucide-react";

export default function InputSection({
    category,
    course,
    section,
    updateAssessment,
    removeAssessmentRow,
    sectionType,
    isSingleObject = false
}) {

    

    const handleChange = (field, value) => {
        updateAssessment(
            course.id,
            section,
            sectionType,
            category.id,
            field,
            value
        );
       
    };
    return (
        <div
            key={category.id}
            className="flex gap-1 sm:gap-2 mb-2 items-center"
        >
            {/* Total Marks Input */}
            <input
                type="number"
                placeholder="Total"
                value={category.totalMarks}
                onChange={(e) => handleChange("totalMarks", e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 text-xs sm:text-sm 
                   focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
           

            {/* Obtained Marks Input */}

            <input
                type="number"
                placeholder="Obtained"
                value={category.obtainedMarks}
                onChange={(e) => handleChange("obtainedMarks", e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 text-xs sm:text-sm 
                     focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
         



            {/* Remove Button */}
            {!isSingleObject && course[section][sectionType]?.length > 1 && (
                <button
                    onClick={() => removeAssessmentRow(course.id, section, sectionType, category.id)}
                    className="bg-red-500 text-white ml-1 sm:ml-2 px-1 py-1 rounded hover:bg-red-600 transition-colors"
                >
                    <X size={12} />
                </button>
            )}
        </div>
    );
}
