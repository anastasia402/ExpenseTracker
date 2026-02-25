import React, { useState, useMemo } from 'react';

const TransactionTable = ({ transactions, onDelete, onEdit, onViewDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const sortedTransactions = useMemo(() => {
    let sortableItems = [...transactions];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [transactions, sortConfig]);

  const nPages = Math.ceil(transactions.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedTransactions.slice(indexOfFirstRecord, indexOfLastRecord);
  const categoryColors = {
  FOOD: '#f59e0b',
  SALARY: '#10b981',
  TRANSPORT: '#3b82f6',
  ENTERTAINMENT: '#8b5cf6',
  HEALTH: '#ef4444'
};

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); 
  };

  const goToNextPage = () => { if (currentPage !== nPages) setCurrentPage(currentPage + 1); };
  const goToPrevPage = () => { if (currentPage !== 1) setCurrentPage(currentPage - 1); };

  return (
    <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full transition-all">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Transaction History</h3>
        <span className="text-[10px] font-bold px-2 py-1 bg-gray-50 text-gray-400 rounded-md tracking-tighter">
          {transactions.length} TOTAL
        </span>
      </div>

      <div className="overflow-x-auto flex-grow">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-[10px] uppercase tracking-widest border-b border-gray-50">
              <th 
                className="pb-4 font-bold cursor-pointer hover:text-indigo-600 transition-colors" 
                onClick={() => requestSort('description')}
              >
                Description
              </th>
              <th 
                className="pb-4 font-bold text-right cursor-pointer hover:text-indigo-600 transition-colors" 
                onClick={() => requestSort('amount')}
              >
                Amount
              </th>
              <th 
                className="pb-4 font-bold text-center cursor-pointer hover:text-indigo-600 transition-colors" 
                onClick={() => requestSort('categoryName')}
              >
                Category
              </th>
              <th className="pb-4 font-bold text-right px-4">Actions</th>
            </tr>
          </thead>
         <tbody className="divide-y divide-gray-50">
  {currentRecords.map((t) => {
    const displayColor = categoryColors[t.categoryName] || t.categoryColor || '#4f46e5';

    return (
      <tr 
        key={t.id} 
        onClick={() => onViewDetails(t)} 
        className="hover:bg-indigo-50/50 cursor-pointer transition-colors"
      >
        <td className="py-4 font-medium text-gray-700">{t.description}</td>
        
        <td className={`py-4 font-bold text-right ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'}`}>
          {t.type === 'INCOME' ? '+' : '-'}{t.amount} {t.currency || 'RON'}
        </td>

        <td className="py-4 text-center">
          <span 
            className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm"
            style={{ 
              backgroundColor: `${displayColor}15`, 
              color: displayColor,                
              border: `1px solid ${displayColor}30` 
            }}
          >
            {t.categoryName}
          </span>
        </td>

        <td className="py-4 text-right" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-end gap-4 px-2">
            <button 
              onClick={() => onEdit(t)} 
              className="text-indigo-600 hover:text-indigo-800 font-bold text-xs uppercase tracking-tighter transition-all hover:scale-105"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(t.id)} 
              className="text-rose-600 hover:text-rose-800 font-bold text-xs uppercase tracking-tighter transition-all hover:scale-105"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>
        </table>
        {transactions.length === 0 && (
          <div className="py-20 text-center text-gray-300 text-sm italic font-light tracking-wide">
            No transactions recorded.
          </div>
        )}
      </div>

      {}
      {transactions.length > recordsPerPage && (
        <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
          <p className="text-[11px] text-gray-400 font-medium">
            Page {currentPage} / {nPages}
          </p>
          <div className="flex gap-4">
            <button 
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`text-xs font-bold transition-all ${currentPage === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-500 hover:text-indigo-600'}`}
            >
              Back
            </button>
            <button 
              onClick={goToNextPage}
              disabled={currentPage === nPages}
              className={`text-xs font-bold transition-all ${currentPage === nPages ? 'text-gray-200 cursor-not-allowed' : 'text-indigo-600 hover:text-indigo-800'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;