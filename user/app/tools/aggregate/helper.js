// src/app/tools/aggregate/helper.js

//Header Description
export const aggregateDescription = {
    title : "COMSATS AGGREGATE CALCULATOR", 
  description : "Calculate your semester and cumulative aggregate with ease using the COMSATS Aggregate Calculator. Track your academic progress, check your grades, and gain a better understanding of the aggregate scale. We're here to support your journey to academic excellence!" 

}

// Configuration for calculator form
export const aggregateConfig = [
  {
    key: 'subject',
    header: 'Subject',
    type: 'text',
    placeholder: 'Subject',
    readonly: true,
    colSpan: 3,
  },
  {
    key: 'total',
    header: 'Total',
    type: 'number',
    placeholder: 'Total',
    colSpan: 3,
    toolTip:true,
    position:"top",
  },
  {
    key: 'obtained',
    header: 'Obtained',
    type: 'number',
    placeholder: 'Obtained',
    colSpan: 3,
    toolTip:true,
    position:"top"
  },
];

// Tips for students
export const aggregateTips = [
  "NTS test has the highest weightage (50%) - focus your preparation here",
  "FSC/A-Level contributes 40% - maintain good grades throughout",
  "Matric has 10% weightage but still important for overall merit",
  "COMSATS require 80%+ aggregate to be on safe side",
];

// Example table columns
export const ExampleCalculationsColumns = [
  { title: 'Step', headerClassName: 'text-left py-2 sm:py-4 px-3 sm:px-6 font-bold text-gray-700' },
  { title: 'Description', headerClassName: 'text-left py-2 sm:py-4 px-3 sm:px-6 font-bold text-gray-700' },
  { title: 'Calculation', headerClassName: 'text-left py-2 sm:py-4 px-3 sm:px-6 font-bold text-gray-700' },
  { title: 'Result', headerClassName: 'text-right py-2 sm:py-4 px-3 sm:px-6 font-bold text-gray-700' },
];

// Example table rows
export const ExampleCalculationsRows = [
  {
    cells: [
      { content: '1' },
      { content: 'NTS Score' },
      { content: '(140/200) × 50', className: 'font-mono text-xs sm:text-sm' },
      { content: '35.00%', className: 'font-semibold text-right text-blue-600' },
    ],
  },
  {
    cells: [
      { content: '2' },
      { content: 'Matric Score' },
      { content: '(850/1100) × 10', className: 'font-mono text-xs sm:text-sm' },
      { content: '7.73%', className: 'font-semibold text-right text-green-600' },
    ],
  },
  {
    cells: [
      { content: '3' },
      { content: 'FSC Score' },
      { content: '(900/1100) × 40', className: 'font-mono text-xs sm:text-sm' },
      { content: '32.73%', className: 'font-semibold text-right text-purple-600' },
    ],
  },
  {
    rowClassName: 'bg-gray-50',
    cells: [
      { content: '4', className: 'font-bold' },
      { content: 'Total Aggregate', className: 'font-bold' },
      { content: '35.00 + 7.73 + 32.73', className: 'font-mono text-xs sm:text-sm' },
      { content: '75.46%', className: 'font-bold text-right text-gray-900' },
    ],
  },
];
