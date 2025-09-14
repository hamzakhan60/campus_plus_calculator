// Form configuration for Target CGPA Calculator
export const columnConfig = [
  {
    key: "prev_credits",
    header: "Previous Credits",
    type: "number",
    placeholder: "Previous Credit Hours",
    colSpan: 1,
    toolTip:true,
    toolTipMessage:"Total credit hours completed before the current semester"

  },
  {
    key: "current_cgpa",
    header: "Current CGPA",
    type: "number",
    placeholder: "Current CGPA",
    colSpan: 1,
    toolTip:true,
    toolTipMessage:"Your CGPA up to the last completed semester"
  },
  {
    key: "target_cgpa",
    header: "Target CGPA",
    type: "number",
    placeholder: "Target CGPA",
    colSpan: 1,
    toolTip:true,
    toolTipMessage:"The CGPA you aim to achieve"
  },
  {
    key: "remaining_credits",
    header: "Remaining Credit Hrs.",
    type: "number",
    placeholder: "Remaining Credit Hours",
    colSpan: 1,
    toolTip:true,
    toolTipMessage:"Total credit hours you have left to complete your degree"
  },
];

// Helpful tips for Target CGPA
export const cgpaTips = [
  "Focus on courses with higher credit hours for maximum impact",
  "Aim for consistent performance rather than just meeting minimum requirements",
  "Consider retaking courses if your institution allows GPA replacement",
  "Plan your course load to maintain quality over quantity",
  "Set realistic semester-wise GPA targets to track progress",
];

// Example calculations table (columns)
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
    title: "Calculation",
    headerClassName: "text-left py-4 px-6 font-bold text-gray-700",
  },
  {
    title: "Result",
    headerClassName: "text-right py-4 px-6 font-bold text-gray-700",
  },
];

// Example calculations table (rows)
export const ExampleCalculationsRows = [
  {
    cells: [
      { content: "1" },
      { content: "Current Total Points" },
      { content: "3.72 × 69 = 256.68", className: "font-mono" },
      {
        content: "256.68 points",
        className: "font-semibold text-right text-blue-600",
      },
    ],
  },
  {
    cells: [
      { content: "2" },
      { content: "Target Total Points" },
      { content: "3.69 × 88 = 324.72", className: "font-mono" },
      {
        content: "324.72 points",
        className: "font-semibold text-right text-green-600",
      },
    ],
  },
  {
    cells: [
      { content: "3" },
      { content: "Required Points" },
      { content: "324.72 - 256.68 = 68.04", className: "font-mono" },
      {
        content: "68.04 points",
        className: "font-semibold text-right text-purple-600",
      },
    ],
  },
  {
    rowClassName: "bg-gray-50",
    cells: [
      { content: "4", className: "font-bold" },
      { content: "Required GPA", className: "font-bold" },
      { content: "68.04 ÷ 19 = 3.58", className: "font-mono" },
      {
        content: "3.58 GPA",
        className: "font-bold text-right text-gray-900",
      },
    ],
  },
];

// Description metadata
export const TargetCGPADescription = {
  title: "COMSATS Target CGPA Calculator",
  description:
    "Estimate the GPA you need in your remaining semesters to achieve your desired CGPA.",
};
