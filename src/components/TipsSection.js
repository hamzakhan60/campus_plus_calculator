import React from 'react';
import { Info } from 'lucide-react';

const TipsSection = ({
  title = "Tips",
  tips = [],
  icon: IconComponent = Info,
  iconSize = 16,
  iconColor = "text-white",
  iconBgColor = "bg-blue-600",
  gradientFrom = "from-blue-50",
  gradientTo = "to-indigo-50",
  borderColor = "border-blue-100",
  titleClassName = "font-semibold text-gray-900 mb-2",
  tipClassName = "text-sm text-gray-700 space-y-1",
  containerClassName = "max-w-7xl mx-auto px-3 sm:px-6 pb-4 sm:pb-6 lg:pb-8",
  wrapperClassName = "",
  showBullets = true,
  bulletStyle = "•",
  
}) => {
  return (
    <div className={containerClassName}>
      <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-2xl p-4 sm:p-6 lg:p-8 border ${borderColor} ${wrapperClassName}`}>
        <div className="flex items-start space-x-2 sm:space-x-3">
          <div className={`${iconBgColor} w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1`}>
            <IconComponent className={iconColor} size={iconSize} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`text-sm sm:text-base font-semibold text-gray-900 mb-2`}>{title}</h4>
            <ul className={`text-xs sm:text-sm text-gray-700 space-y-1`}>
              {tips.map((tip, index) => (
                <li key={index} className="leading-relaxed">
                  {showBullets && `${bulletStyle} `}{tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TipsSection;