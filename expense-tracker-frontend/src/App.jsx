import React, { useState, useEffect } from 'react';
import { getTransactionsByMonth, deleteTransaction } from './services/api'; 
import SummaryCard from './components/SummaryCard';
import TransactionTable from './components/TransactionTable';
import TransactionForm from './components/TransactionForm';
import TransactionModal from './components/TransactionModal';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [selectedForDetails, setSelectedForDetails] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const fetchFilteredData = async () => {
    try {
      const [year, month] = selectedMonth.split('-');
      const data = await getTransactionsByMonth(year, month);
      setTransactions(data);
    } catch (error) {
      console.error("An error occured when fitering", error);
    }
  };

  useEffect(() => {
    fetchFilteredData();
  }, [selectedMonth]);

  const handleDelete = async (id) => {
    if (window.confirm("Confirm delete")) {
      try {
        await deleteTransaction(id);
        fetchFilteredData(); 
      } catch (error) {
        alert("Error on delete!");
      }
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalIncome = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8 flex flex-col md:row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-indigo-700">Expense Tracker</h1>

        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-gray-500">Period:</span>
          <input 
            type="month" 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="outline-none text-indigo-600 font-bold cursor-pointer"
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <SummaryCard title="Balance" amount={balance} colorClass={balance >= 0 ? "text-gray-800" : "text-red-600"} />
          <SummaryCard title="Incomes" amount={totalIncome} colorClass="text-green-600" />
          <SummaryCard title="Expenses" amount={totalExpenses} colorClass="text-red-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <TransactionForm 
            onTransactionAdded={fetchFilteredData} 
            editingTransaction={editingTransaction}
            clearEdit={() => setEditingTransaction(null)}
          />
          <TransactionTable 
            transactions={transactions} 
            onDelete={handleDelete} 
            onEdit={handleEdit} 
            onViewDetails={(t) => setSelectedForDetails(t)}
          />
        </div>
      </main>
      <TransactionModal 
        transaction={selectedForDetails}
        isOpen={!!selectedForDetails}
        onClose={() => setSelectedForDetails(null)}
      />
    </div>
  );
};

export default App;