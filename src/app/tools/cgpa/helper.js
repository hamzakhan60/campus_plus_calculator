
// Column configuration for input fields
export const columnConfig = [
  {
    key: "prev_credits",
    header: "Previous Credits",
    type: "number",
    placeholder: "Current Credits",
    colSpan: 1,
  },
  {
    key: "current_cgpa",
    header: "Current CGPA",
    type: "number",
    placeholder: "Current CGPA",
    colSpan: 1,
  },
  {
    key: "curr_semester_credits",
    header: "Current Semester Credits",
    type: "number",
    placeholder: "Current Semester Credits",
    colSpan: 1,
  },
  {
    key: "curr_semester_gpa",
    header: "Current Semester GPA",
    type: "number",
    placeholder: "Current Semester GPA",
    colSpan: 1,
  },
];

// Tips for improving CGPA
export const CGPATips = [
  "Focus on courses with higher credit hours for maximum impact",
  "Aim for consistent performance rather than just meeting minimum requirements",
  "Consider retaking courses if your institution allows GPA replacement",
  "Plan your course load to maintain quality over quantity",
  "Set realistic semester-wise GPA targets to track progress",
];

// Example calculation table columns
export const ExampleCalculationsColumns = [
  {
    title: "Step",
    headerClassName: "text-left py-4 px-6 font-bold text-gray-700",
  },
  {
    title: "Description",
    headerClassName: "text-left py-4 px-6 font-bold text-gray-700",
  },
  {
    title: "Values",
    headerClassName: "text-left py-4 px-6 font-bold text-gray-700",
  },
];

// Example calculation table rows
export const ExampleCalculationsRows = [
  {
    cells: [
      { content: "1" },
      { content: "Total Previous Cr. Hrs" },
      { content: "88", className: "font-mono" },
    ],
  },
  {
    cells: [
      { content: "2" },
      { content: "Current Cgpa" },
      { content: "3.69", className: "font-mono" },
    ],
  },
  {
    cells: [
      { content: "3" },
      { content: "Current Semester Cr. Hrs" },
      { content: "19", className: "font-mono" },
    ],
  },
  {
    cells: [
      { content: "4" },
      { content: "Current Semester GPA" },
      { content: "3.67", className: "font-mono" },
    ],
  },
  {
    cells: [
      { content: "", className: "bg-gray-50" },
      {
        content:
          "CGPA = (88 × 3.69 + 19 × 3.67) / (88 + 19) = 3.69",
        className:
          "bg-gray-50 font-bold text-center text-gray-900",
      },
      { content: "", className: "bg-gray-50" },
    ],
  },
];

// Description metadata
export const CGPADescription = {
  title: "COMSATS CGPA CALCULATOR",
  description: "Write description regarding CGPA of COMSATS",
};
