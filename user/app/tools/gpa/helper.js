// Dropdown options for GPA grades
export const gpaOptions = [
  { value: "4.00", label: "A (4.00)" },
  { value: "3.66", label: "A- (3.66)" },
  { value: "3.33", label: "B+ (3.33)" },
  { value: "3.00", label: "B (3.00)" },
  { value: "2.66", label: "B- (2.66)" },
  { value: "2.33", label: "C+ (2.33)" },
  { value: "2.00", label: "C (2.00)" },
  { value: "1.66", label: "C- (1.66)" },
  { value: "1.33", label: "D+ (1.33)" },
  { value: "1.00", label: "D (1.00)" },
  { value: "0.00", label: "F (0.00)" },
];

// Configuration for GPA calculator form
export const gpaConfig = [
  {
    key: "course",
    header: "Course",
    type: "text",
    placeholder: "Course",
  },
  {
    key: "grade",
    header: "GPA",
    type: "dropdown",
    placeholder: "GPA",
    options: gpaOptions,
  },
  {
    key: "creditHours",
    header: "Credit Hours",
    type: "number",
    placeholder: "Credit Hours",
    toolTip: true,
    toolTipMessage: "Enter credit hours (1-4)",
    position: "top",
  },
];

// Tips for GPA calculation
export const gpaTips = [
  "Use this mode when you already know your subject grades",
  "Perfect for calculating cumulative GPA across semesters",
  "Higher credit hour subjects impact GPA more significantly",
  "GPA of 3.5+ is considered excellent for most programs",
];

// Description metadata
export const GPADescription = {
  title: "COMSATS GPA CALCULATOR",
  description: "Write description regarding GPA of COMSATS",
};
