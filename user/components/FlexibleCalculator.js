"use client";
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Tooltip from './Tooltip';

const FlexibleCalculator = ({
  title = "Calculator",
  columns = 1,
  data = [],
  onDataChange,
  columnConfig = [],
  showDeleteButton = true,
  showAddButton = true,
  addButtonText = "Add Course",
  addButtonDisabled = false,
  result = null,
  resultLabel = "Result",
  onAddRow,
  onDeleteRow,
}) => {

  const [focusedColumn, setFocusedColumn] = useState(null);
  const [errors, setErrors] = useState(null);

  




  const handleInputChange = (rowIndex, fieldKey, value) => {
    console.log("handleInputChange called:", rowIndex, fieldKey, value);
    if (onDataChange) {
      let message=onDataChange(rowIndex, fieldKey, value);
      if(message){
        setFocusedColumn(`${rowIndex}-${fieldKey}`);
        setErrors(message.errorMessage);
        }
      else{
        setFocusedColumn(null);
        setErrors(null);
      }
    }
  };
  const handleFocus = (columnKey, rowIndex) => {
    setErrors(null);
    setFocusedColumn(`${rowIndex}-${columnKey}`);
  };
  const handleBlur = () => {
    setFocusedColumn(null);
  };

  const handleAddRow = () => {
    if (onAddRow && !addButtonDisabled) {
      onAddRow();
    }
  };

  const handleDeleteRow = (rowIndex) => {
    if (onDeleteRow && showDeleteButton) {
      onDeleteRow(rowIndex);
    }
  };

  const renderInputField = (row, column, rowIndex) => {
    const value = row[column.key] || '';
    const isFocused = focusedColumn === `${rowIndex}-${column.key}`;

    if (column.type === 'dropdown') {
      return (
        <select
          value={value}
          onChange={(e) => handleInputChange(rowIndex, column.key, e.target.value)}
          className="w-full px-2 sm:px-3 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm bg-white text-gray-600"
          disabled={column.disabled}
        >
          <option value="" className="text-gray-500">{column.placeholder || "Select option"}</option>
          {column.options?.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-600">
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <>
      {column.toolTip ? (<Tooltip message={errors ? errors : column.toolTipMessage} position={column.position} type={errors ? 'error' : 'info'} isVisible={isFocused}/>) : null}
        <input
          type={column.type || 'text'}
          placeholder={column.placeholder || ''}
          value={value}
          onChange={(e) => handleInputChange(rowIndex, column.key, e.target.value)}
          onFocus={() => handleFocus(column.key, rowIndex)}
          onBlur={handleBlur}
          readOnly={column.readonly}
          className={`w-full px-2 sm:px-3 py-2 sm:py-3 border border-gray-300 text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm ${column.readonly ? 'bg-gray-50 font-medium' : ''
            } ${column.textAlign === 'center' ? 'text-center' : ''}`}
        />
     </> 

    );
  };

  const getGridColsClass = (columnsCount) => {
    const gridClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-3 sm:grid-cols-3 md:grid-cols-3',
      4: 'grid-cols-3 sm:grid-cols-3 md:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
      7: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7',
      8: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8',
      9: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9',
      10: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10',
      11: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-11',
      12: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12'
    };
    return gridClasses[columnsCount] || 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12';
  };

  const totalColumns = columns > 1 ? columnConfig.length : 1;

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <h3 className="text-lg sm:text-2xl font-bold text-primary">{title}</h3>
          {showAddButton && (
            <button
              onClick={handleAddRow}
              disabled={addButtonDisabled}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto justify-center ${addButtonDisabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-secondary text-white hover:bg-blue-600'
                }`}
            >
              <Plus size={14} className="sm:w-4 sm:h-4" />
              <span>{addButtonText}</span>
            </button>
          )}
        </div>


        {/* Data Rows */}
        <div className="">

          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center">
              <div className={`grid ${getGridColsClass(totalColumns)} flex-1`}>
                {columnConfig.map((column, columnIndex) => (

                  <div key={columnIndex} className="col-span-1">
                    {renderInputField(row, column, rowIndex)}
                  </div>
          ))}
              </div>

              {/* Delete Button */}
              {showDeleteButton && data.length > 1 && (
                <div className="w-10 sm:w-12 flex-shrink-0 flex justify-center items-center">
                  <button
                    onClick={() => handleDeleteRow(rowIndex)}
                    className="w-7 h-7 flex items-center justify-center border border-gray-400 rounded-full text-gray-500 hover:text-red-700 hover:border-red-700 cursor-pointer transition-colors"
                    title="Delete row"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Result Display */}
        {result !== null && (
          <div className="mt-4 sm:mt-2 flex justify-center sm:justify-end">
            <div className="relative rounded-full p-2 shadow-2xl">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 sm:border-8 border-gray-200 flex items-center justify-center bg-white">
                {result <= 4 || title == "Aggregate Calculator" ? (<div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-gray-800">
                    {typeof result === 'number' ? result.toFixed(2) : result}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium">{resultLabel}</div>
                </div>) :
                  (<div className="text-center">
                    <div className="text-sm sm:text-xl font-bold text-red-500">
                      Not Possible
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 font-medium">exceeding the 4</div>
                  </div>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlexibleCalculator;