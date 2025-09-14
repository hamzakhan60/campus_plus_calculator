
import React from 'react';
import {
    Calculator,
    BookOpen,
    TrendingUp,
    Percent,
    Target,
    User,
    Star,

} from 'lucide-react';

import Link from 'next/link';


const GPADashboard = () => {



    const calculatorTools = [
        { id: 'aggregate', name: 'Aggregate Calculator', icon: Calculator, },
        { id: 'gpa', name: 'GPA Calculator', icon: BookOpen, },
        { id: 'cgpa', name: 'CGPA Calculator', icon: TrendingUp, },
        { id: 'assesment-gpa', name: 'Assessment GPA', icon: Percent, },
        { id: 'forecaster', name: 'CGPA Forecaster', icon: Target, }
    ];

    const Card = ({ name, icon: Icon }) => (
        <div className="group bg-white/95 backdrop-blur-sm  shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:scale-105">
            <div className={`h-2 bg-gradient-primary`}></div>
            <div className="p-6">
                <div className={`w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-secondary">{name}</h3>
                <p className="text-gray-600 text-sm">Click to start calculating</p>
            </div>
        </div>
    );

    const DashboardHome = () => (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-primary p-6 sm:p-8 text-white shadow-2xl rounded-2xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-4 md:space-y-0 md:space-x-6 mb-6">
                    {/* Icon */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        <User className="text-white" size={28} />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, Comsians!</h2>
                        <p className="text-blue-100 text-base sm:text-lg">
                            Ready to calculate your academic progress?
                        </p>
                    </div>
                </div>

                {/* Daily Motivation Card */}
                <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-white/20">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                        <Star className="text-yellow-300 flex-shrink-0" size={20} />
                        <div>
                            <p className="text-base sm:text-lg font-medium mb-1">Daily Motivation</p>
                            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                                "Success is the sum of small efforts repeated day in and day out."
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Calculator Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {calculatorTools.map((tool) => (
                    <div
                        key={tool.id}
                        className="block cursor-pointer"
                    >
                        <Link href={`/tools/${tool.id}`}>
                            <Card name={tool.name} icon={tool.icon} />
                        </Link>
                    </div>
                ))}
            </div>


        </div>
    );




    return (
        <div
            className="min-h-screen bg-cover bg-center bg-fixed relative"
            style={{ backgroundImage: "url('/bg.jpg')" }}

        >
            {/* Overlay */}
            <div className="absolute inset-0"></div>







            {/* Main content */}

            <div className="p-6 lg:p-12">
                <DashboardHome />
            </div>
        </div>

    );
};

export default GPADashboard;