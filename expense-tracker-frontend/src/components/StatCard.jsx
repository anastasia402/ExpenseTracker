import React from 'react';

const StatCard = ({ title, amount, colorClass, icon }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      {icon && (
        <div className={`p-3 rounded-xl ${colorClass.replace('text-', 'bg-').replace('600', '100')}`}>
           <span className={`text-xl ${colorClass}`}>●</span>
        </div>
      )}
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h2 className={`text-2xl font-bold ${colorClass}`}>
          {amount.toLocaleString()} RON
        </h2>
      </div>
    </div>
  );
};

export default StatCard;