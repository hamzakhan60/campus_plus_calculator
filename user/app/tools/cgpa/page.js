"use client";
import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import DescriptionText from '../../../components/DescriptionText';
import MotivationCard from '../../../components/MotivationCard';
import FlexibleCalculator from '../../../components/FlexibleCalculator';
import ResultsSidebar from '../../../components/ResultSidebar';
import {ExampleCalculations} from '../../../components/ExampleCalculations';
import TipsSection from '../../../components/TipsSection';
import {
  columnConfig,
  CGPATips,
  ExampleCalculationsColumns,
  ExampleCalculationsRows,
  CGPADescription,
} from "./helper";
import { validateCourseField } from '@/utils/validation';


const CGPACalculator = () => {
    const [cgpaData, setCgpaData] = useState([{
        prev_credits: '',
        current_cgpa: '',
        curr_semester_credits: '',
        curr_semester_gpa: ''
    }]);
    const [newCGPA, setNewCGPA]= useState(0.0)

    const handleDataChange = (rowIndex, fieldKey, value) => {
        let validatedInput=null;
        if(fieldKey=="curr_semester_gpa" || fieldKey=="current_cgpa")
            validatedInput=validateCourseField({ field: "gpa", value });
        else
            validatedInput=validateCourseField({ field: "toalCredits", value });
        const newData = [...cgpaData];
        newData[rowIndex] = {
            ...newData[rowIndex],
            [fieldKey]: validatedInput.value
        };
        setCgpaData(newData);
        if(validatedInput.error){
            validatedInput.rowIndex=rowIndex;
            validatedInput.fieldKey=fieldKey;
            return validatedInput;
        }
        else
            return null;
    };


    const calculateNewCGPA = () => {
        const row = cgpaData[0]; // Using first row for calculation
        const prevCredits = parseFloat(row.prev_credits) || 0;
        const currentCgpa = parseFloat(row.current_cgpa) || 0;
        const currSemCredits = parseFloat(row.curr_semester_credits) || 0;
        const currSemGpa = parseFloat(row.curr_semester_gpa) || 0;

        if (prevCredits === 0 && currSemCredits === 0) return 0.0;

        // CGPA Formula: [(Previous Credits × Current CGPA) + (Current Semester Credits × Current Semester GPA)] / (Previous Credits + Current Semester Credits)
        const numerator = (prevCredits * currentCgpa) + (currSemCredits * currSemGpa);
        const denominator = prevCredits + currSemCredits;

        if (denominator === 0) return 0.0;
        console.log("Numerator:", numerator, "Denominator:", denominator);
        console.log("Raw CGPA:", numerator / denominator);
        return  Math.round((numerator / denominator) * 1000) / 1000;
    };

   // Use useEffect to calculate CGPA when cgpaData changes
    useEffect(() => {
        const calculatedCGPA = calculateNewCGPA();
        console.log("Calculated CGPA:", calculatedCGPA)
        setNewCGPA(calculatedCGPA);
    }, [cgpaData]);

     // Validation function
    const validateInput = (rowIndex, value, type) => {
        const newErrors = { ...errors };
        const errorKey = `${rowIndex}_${type}`;

        if (value === '') {
            delete newErrors[errorKey];
        } else if (isNaN(value) || parseFloat(value) < 0) {
            newErrors[errorKey] = 'Please enter a valid positive number';
        } else if (type === 'obtained') {
            const totalValue = aggregateData[rowIndex].total;
            if (totalValue && parseFloat(value) > parseFloat(totalValue)) {
                newErrors[errorKey] = 'Obtained marks cannot exceed total marks';
            } else {
                delete newErrors[errorKey];
            }
        } else {
            delete newErrors[errorKey];
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Prepare result data for sidebar
    const getResultData = () => {
        return {
            title: "Aggregate Result",
            description: "Based on merit calculation policy, this shows your aggregate score from NTS, Matric, and FSC results.",
            resultRows: [
                { label: "Prev. Crs", value: cgpaData[0].prev_credits, decimals: 2 },
                { label: "Current Cgpa", value: cgpaData[0].current_cgpa, decimals: 2 },
                { label: "Current Sem Cr.", value: cgpaData[0].curr_semester_credits, decimals: 2 },
                { label: "Current Sem gpa", value: cgpaData[0].curr_semester_gpa, decimals: 2, valueClass: "text-blue-600" },
                { label: "CGPA", value: newCGPA, decimals: 2, valueClass: "text-blue-600" }
            ],
             remarks: newCGPA >= 3.5 ? "Great performance! Keep up the good work." :
                newCGPA >= 3.0 ? "Good performance! Keep working hard." :
                newCGPA >= 2.5 ? "Average performance. Consider improving your study habits." :
                "Below average. Focus on your studies to improve your GPA."
        };
    };
 return (
        <div style={{ backgroundImage: `url(/bg.jpg)` }} className="min-h-screen relative overflow-hidden">
            <div className="relative z-10">
                {/* Header */}
                <Header />

                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Header Info */}
                        <DescriptionText title={CGPADescription.title} description={CGPADescription.description} />

                        {/* Right Column - Calculator */}
                        <div className="lg:col-span-2">
                            {/* Motivational Quote */}
                            <MotivationCard />

                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                <div className="xl:col-span-2 w-full mx-auto space-y-12">
                                   
                                        <FlexibleCalculator
                                            title="CGPA Calculator"
                                            columns={1}
                                            data={cgpaData}
                                            onDataChange={handleDataChange}
                                            columnConfig={columnConfig}
                                            showDeleteButton={false} // Only one row needed for CGPA calculation
                                            showAddButton={false} // Only one calculation at a time
                                            addButtonText="Add Calculation"
                                            result={newCGPA}
                                            resultLabel="Current CGPA"
                                        />
                                    </div>  

                                    {/* Results Sidebar */}
                                    <div>
                                        <ResultsSidebar
                                            {...getResultData()}
                                            headerBgColor="bg-blue-800"
                                            addPercentage={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Example Calculations*/}
                    <ExampleCalculations
                        title="Example Calculation"
                        columns={ExampleCalculationsColumns}
                        rows={ExampleCalculationsRows}
                    />
                    

                    {/* Tips Section */}
                    <TipsSection
                        title="Tips for Better Aggregate"
                        tips={CGPATips}
                    />
                </div>
            </div>
            );
};

export default CGPACalculator;
