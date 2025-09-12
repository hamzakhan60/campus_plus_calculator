import { Calculator } from "lucide-react";

const DescriptionText = ({ 
  title = "COMSATS AGGREGATE CALCULATOR", 
  description = "Calculate your semester and cumulative aggregate with ease using the COMSATS Aggregate Calculator. Track your academic progress, check your grades, and gain a better understanding of the aggregate scale. We're here to support your journey to academic excellence!" 
}) => {
  return (
    <div className="lg:col-span-1">
      {/* Text Section */}
      <div className="text-white mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          {title}
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-blue-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
          {description}
        </p>
      </div>

      {/* Illustration/Icon Section */}
      <div className="hidden md:flex justify-center lg:justify-start items-center">
        <div className="relative">
          {/* Gradient Background Shape */}
          <div className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl opacity-20 transform rotate-12"></div>

          {/* Icon in Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Calculator className="text-white" size={60} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionText;
