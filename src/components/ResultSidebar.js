import React from 'react';

const ResultsSidebar = ({
  title = "Detailed Result",
  description = "",
  resultRows = [],
  remarks = "No remarks",
  headerBgColor = "bg-secondary",
  headerTextColor = "text-white",
  addPercentage=true
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className={`${headerBgColor} ${headerTextColor} p-4`}>
        <h4 className="font-bold">{title}</h4>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Description */}
        {description && (
          <div className="text-sm">
            <p className="text-gray-600 mb-2">{description}</p>
          </div>
        )}

        {/* Result Rows */}
        {resultRows.length > 0 && (
          <div className="space-y-2 text-sm">
            {resultRows.map((row, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{row.label}:</span>
                <span className={`font-semibold ${row.valueClass || ''}`}>
                  {typeof row.value === 'number' ? row.value.toFixed(row.decimals || 2) : row.value}{addPercentage ? "%":''}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Remarks */}
        {remarks && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">{remarks}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ResultsSidebar;