"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import DescriptionText from '@/components/DescriptionText';
import MotivationCard from '@/components/MotivationCard';
import FlexibleCalculator from '@/components/FlexibleCalculator';
import ResultsSidebar from '@/components/ResultSidebar';
import TipsSection from '@/components/TipsSection';
import {
    gpaOptions,
    gpaConfig,
    gpaTips,
    GPADescription,
} from "@/app/tools/gpa/helper";
import { validateCourseField } from '@/utils/validation';


const GPACalculator = () => {
    const [totalCr, setTotalCr] = useState(0);
    const [totalGradePoints, setTotalGradePoints] = useState(0.0);
    const [currentGPA, setCurrentGPA] = useState(0.0);


    // GPA Calculator Data
    const [gpaData, setGpaData] = useState([
        { course: '', creditHours: '', grade: '' },
        { course: '', creditHours: '', grade: '' },
        { course: '', creditHours: '', grade: '' },
        { course: '', creditHours: '', grade: '' }
    ]);


    // Handlers for GPA Calculator
    const handleGpaChange = (rowIndex, fieldKey, value) => {
        let validatedCreditHrs = null
        if (fieldKey === 'creditHours') {
            validatedCreditHrs = validateCourseField({ field: 'creditHours', value });
        }
        const newData = [...gpaData];
        newData[rowIndex][fieldKey] = fieldKey === 'creditHours' ? validatedCreditHrs.value : value;
        setGpaData(newData);
        if (validatedCreditHrs.error) {
            validatedCreditHrs.rowIndex=rowIndex;
            validatedCreditHrs.fieldKey=fieldKey;
            return validatedCreditHrs;
        }
        else
            return null;
    };

    const addGpaRow = () => {
        setGpaData([...gpaData, { course: '', creditHours: '', grade: '' }]);
    };

    const deleteGpaRow = (rowIndex) => {
        if (gpaData.length > 1) {
            const newData = gpaData.filter((_, index) => index !== rowIndex);
            setGpaData(newData);
        }
    };

    // Calculate GPA
    const calculateGPA = () => {
        let totalPoints = 0;
        let totalCredits = 0;

        gpaData.forEach(item => {
            if (item.creditHours && item.grade) {
                const credits = parseFloat(item.creditHours);
                const gradePoints = parseFloat(item.grade);
                totalPoints += credits * gradePoints;
                totalCredits += credits;
            }
        });

        return {
            gpa: totalCredits > 0 ? totalPoints / totalCredits : 0,
            totalCredits,
            totalPoints
        };
    };
    // Update calculations when gpaData changes
    useEffect(() => {
        const { gpa, totalCredits, totalPoints } = calculateGPA();
        console.log("Calculated GPA:", gpa);
        setCurrentGPA(gpa);
        setTotalCr(totalCredits);
        setTotalGradePoints(totalPoints);
    }, [gpaData]);

    const gpaResultData = {
        title: "GPA Result",
        description: "Based on COMSATS GPA policy, this calculator lets you enter course details, marks, and credits for instant results.",
        resultRows: [
            { label: "Total Credit Hours", value: totalCr, decimals: 0 },
            { label: "Honor Points", value: totalGradePoints, decimals: 2 },
            { label: "Current GPA", value: currentGPA, decimals: 2, valueClass: "text-green-600" },
        ],
        remarks: currentGPA >= 3.5 ? "Great performance! Keep up the good work." :
            currentGPA >= 3.0 ? "Good performance! Keep working hard." :
                currentGPA >= 2.5 ? "Average performance. Consider improving your study habits." :
                    "Below average. Focus on your studies to improve your GPA."
    };
    return (
        <div style={{ backgroundImage: `url(/bg.jpg)` }} className="min-h-screen relative overflow-hidden">
            <div className="relative z-10">
                {/* Header */}
                <Header />

                <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {/* Left Column - Header Info */}
                        <div className="order-2 lg:order-1">
                            <DescriptionText title={GPADescription.title} description={GPADescription.description} />
                        </div>

                        {/* Right Column - Calculator */}
                        <div className="lg:col-span-2 order-1 lg:order-2">
                            {/* Motivational Quote */}
                            <MotivationCard />

                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                                <div className="xl:col-span-3 w-full mx-auto space-y-8 sm:space-y-12">
                                    {/* GPA Calculator */}
                                    <div>
                                        <FlexibleCalculator
                                            title="GPA Calculator (Grade Based)"
                                            columns={3}
                                            data={gpaData}
                                            onDataChange={handleGpaChange}
                                            columnConfig={gpaConfig}
                                            showDeleteButton={true}
                                            showAddButton={true}
                                            addButtonText="Add Course"
                                            onAddRow={addGpaRow}
                                            onDeleteRow={deleteGpaRow}
                                            result={currentGPA}
                                            resultLabel="GPA"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Sidebar */}
                <div className='max-w-7xl mb-5 mx-auto px-3 sm:px-6'>
                    <ResultsSidebar
                        {...gpaResultData}
                        headerBgColor="bg-blue-800"
                        addPercentage={false}
                    />
                </div>

                {/* Tips Section */}
                <TipsSection
                    title="Tips for Better Aggregate"
                    tips={gpaTips}
                />
            </div>
        </div>
    );
};

export default GPACalculator;
