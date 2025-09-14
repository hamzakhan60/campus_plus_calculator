import React from 'react';

export const ExampleCalculations = ({ 
  title, 
  columns, 
  rows, 
  className = "",
  tableClassName = "w-full",
  headerRowClassName = "bg-gray-50",
  bodyRowClassName = "",
  cellClassName = "py-4 px-6 text-sm"
}) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        {title && (
          <h3 className="text-2xl font-bold text-primary mb-6">{title}</h3>
        )}
        <div className="overflow-x-auto">
          <table className={tableClassName}>
            {/* Table Header */}
            {columns && columns.length > 0 && (
              <thead>
                <tr className={headerRowClassName}>
                  {columns.map((column, index) => (
                    <th 
                      key={index}
                      className={`font-bold text-gray-700 ${column.headerClassName || 'text-left py-4 px-6'}`}
                      style={column.headerStyle}
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {rows.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className={`${bodyRowClassName} ${row.rowClassName || ''}`}
                  style={row.rowStyle}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex}
                      className={`${cellClassName} ${cell.className || ''}`}
                      style={cell.style}
                    >
                      {cell.content}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
