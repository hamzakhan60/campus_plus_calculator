"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import DescriptionText from '@/components/DescriptionText';
import MotivationCard from '@/components/MotivationCard';
import FlexibleCalculator from '@/components/FlexibleCalculator';
import ResultsSidebar from '@/components/ResultSidebar';
import {ExampleCalculations} from '@/components/ExampleCalculations';
import TipsSection from '@/components/TipsSection';
import {
  columnConfig,
  cgpaTips,
  ExampleCalculationsColumns,
  ExampleCalculationsRows,
  TargetCGPADescription,
} from "./helper";

const CGPAForecaster = () => {
     const [cgpaData, setCgpaData] = useState([{
        prev_credits: '',
        current_cgpa: '',
        target_cgpa: '',
        remaining_credits: ''
    }]);
    const [requiredGPA, setRequiredGPA] =useState(null);

     const handleDataChange = (rowIndex, fieldKey, value) => {
        const newData = [...cgpaData];
        newData[rowIndex] = {
            ...newData[rowIndex],
            [fieldKey]: value
        };
        setCgpaData(newData);
    };

    const calculateRequiredGPA = () => {
        const row = cgpaData[0];
        const prevCredits = parseFloat(row.prev_credits) || 0;
        const currentCgpa = parseFloat(row.current_cgpa) || 0;
        const remainingCredits = parseFloat(row.remaining_credits) || 0;
        const targetCGPA = parseFloat(row.target_cgpa) || 0;

        if (prevCredits === 0 || remainingCredits === 0) return null;

        // Calculate required GPA
        const currentTotalPoints = prevCredits * currentCgpa;
        const targetTotalPoints = (remainingCredits + prevCredits) * targetCGPA;
        const requiredPoints = targetTotalPoints - currentTotalPoints;
        const requiredGpa = requiredPoints / remainingCredits;

        return requiredGpa;
    };

    // Use useEffect to calculate CGPA when cgpaData changes
    useEffect(() => {
        const calculatedGPA = calculateRequiredGPA();
        setRequiredGPA(calculatedGPA);
    }, [cgpaData]);
     // Prepare result data for sidebar
    const getResultData = () => {
        return {
            title: "CGPA Forecast Result",
            description: "This shows the required GPA you need to achieve your target CGPA.",
            resultRows: [
                { label: "Current Credits", value: cgpaData[0].prev_credits, decimals: 0 },
                { label: "Current CGPA", value: cgpaData[0].current_cgpa, decimals: 2 },
                { label: "Target CGPA", value: cgpaData[0].target_cgpa, decimals: 2 },
                { label: "Remaining Credits", value: cgpaData[0].remaining_credits, decimals: 0 },
                { label: "Required GPA", value: requiredGPA, decimals: 2, valueClass: "text-blue-600 font-bold" }
            ],
            remarks: requiredGPA > 4.0 ? "Target may be unrealistic. Consider adjusting your target CGPA." :
                requiredGPA >= 3.5 ? "Challenging but achievable! Focus on your studies." :
                requiredGPA >= 3.0 ? "Moderate effort required. You can do it!" :
                requiredGPA >= 2.0 ? "Manageable target. Stay consistent with your efforts." :
                requiredGPA < 0 ? "You've already exceeded your target CGPA!" :
                "Please enter valid values to see recommendations."
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
                        <DescriptionText title={TargetCGPADescription.title} description={TargetCGPADescription.description} />

                        {/* Right Column - Calculator */}
                        <div className="lg:col-span-2">
                            {/* Motivational Quote */}
                            <MotivationCard />

                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                <div className="xl:col-span-2 w-full mx-auto space-y-12">
                                    <FlexibleCalculator
                                        title="CGPA Forecaster"
                                        columns={1}
                                        data={cgpaData}
                                        onDataChange={handleDataChange}
                                        columnConfig={columnConfig}
                                        showDeleteButton={false}
                                        showAddButton={false}
                                        result={requiredGPA}
                                        resultLabel="Required GPA"
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

                    {/* Example Calculations */}
                    <ExampleCalculations
                        title="Example Calculation"
                        columns={ExampleCalculationsColumns}
                        rows={ExampleCalculationsRows}
                    />

                    {/* Tips Section */}
                    <TipsSection
                        title="Tips for Better CGPA"
                        tips={cgpaTips}
                    />
                </div>
            </div>
        </div>
    );
};

export default CGPAForecaster;

