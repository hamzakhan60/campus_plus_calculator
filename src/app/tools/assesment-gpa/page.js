"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import DescriptionText from '@/components/DescriptionText';
import TipsSection from '@/components/TipsSection'
import AssesmentGpa from '@/components/AssesmentGpa/index';
import { gpaTips, gpaDescription } from "./helper";

const AssesementCalculator = () => {
    const [totalCr, setTotalCr] = useState(0);
    const [totalGradePoints, setTotalGradePoints] = useState(0.0);
     const [currentGPA, setCurrentGPA] = useState(0);

     // GPA Calculator Data
    const [gpaData, setGpaData] = useState([
        { course: '', creditHours: '', grade: '' }
    ]);

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
        setCurrentGPA(gpa);
        setTotalCr(totalCredits);
        setTotalGradePoints(totalPoints);
    }, [gpaData]);

     return (
        <div style={{ backgroundImage: `url(/bg.jpg)` }} className="min-h-screen relative overflow-hidden">
            <div className="relative z-10">
                {/* Header */}
                <Header />

                <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {/* Left Column - Header Info */}
                        <div className="order-2 lg:order-1">
                            <DescriptionText title={gpaDescription.title} description={gpaDescription.description} />
                        </div>

                        {/* Right Column - Calculator */}
                        <div className="lg:col-span-2 order-1 lg:order-2">

                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                                <div className="xl:col-span-3 w-full mx-auto space-y-8 sm:space-y-12">
                                    {/* GPA Calculator */}
                                    <div>
                                        <AssesmentGpa/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default AssesementCalculator;
