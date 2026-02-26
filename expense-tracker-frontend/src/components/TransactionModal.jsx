import React from 'react';

const TransactionModal = ({ transaction, isOpen, onClose }) => {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
        <div className={`p-6 ${transaction.type === 'INCOME' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-80 uppercase tracking-wider font-semibold">Transaction details</p>
              <h2 className="text-2xl font-bold">{transaction.description}</h2>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl">&times;</button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Amount</p>
              <p className={`text-xl font-bold ${transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.signedAmount} {transaction.currency}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Date</p>
              <p className="text-gray-700 font-medium">{transaction.date}</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Category</p>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1" 
                    style={{ backgroundColor: `${transaction.categoryColor}20`, color: transaction.categoryColor }}>
                {transaction.categoryName}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Payment method</p>
              <p className="text-gray-700 font-medium">{transaction.paymentMethod || 'Not specified'}</p>
            </div>
          </div>

          {transaction.location && (
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Location</p>
              <p className="text-gray-700">{transaction.location}</p>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <div className={`w-3 h-3 rounded-full ${transaction.recurring ? 'bg-indigo-500' : 'bg-gray-300'}`}></div>
            <p className="text-sm text-gray-600">
              {transaction.recurring ? 'Recurring transaction' : 'Single transaction'}
            </p>
          </div>
        </div>
        <div className="p-4 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;