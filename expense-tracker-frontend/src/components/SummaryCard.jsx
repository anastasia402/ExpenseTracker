import React from 'react';

const SummaryCard = ({ title, amount, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <h2 className={`text-2xl font-bold ${colorClass}`}>
        {amount}
      </h2>
    </div>
  );
};

export default SummaryCard;