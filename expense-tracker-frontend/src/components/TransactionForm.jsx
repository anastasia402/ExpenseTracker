import React, { useState, useEffect } from 'react';
import { createTransaction, updateTransaction } from '../services/api';

const TransactionForm = ({ onTransactionAdded, editingTransaction, clearEdit }) => {
  const initialState = {
    description: '',
    amount: '',
    currency: 'RON',
    date: new Date().toISOString().split('T')[0],
    type: 'EXPENSE',
    paymentMethod: 'CARD',
    categoryName: 'FOOD',
    recurring: false,
    location: ''
  };

  const CATEGORIES = [
  "FOOD", "RENT", "SALARY", "UTILITIES", "TRANSPORT", 
  "ENTERTAINMENT", "HEALTH", "SHOPPING", "BONUS", "SERVICES", "OTHER"
];

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingTransaction) {
      setFormData(editingTransaction);
    } else {
      setFormData(initialState);
    }
  }, [editingTransaction]);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateTransaction(formData.id, formData);
        alert("Tranzacție actualizată!");
      } else {
        await createTransaction(formData);
        alert("Tranzacție adăugată!");
      }

      setFormData(initialState); 
      if (clearEdit) clearEdit(); 
      if (onTransactionAdded) onTransactionAdded(); 
      
    } catch (error) {
       console.error("Eroare la salvare:", error);
       alert("A apărut o eroare. Verifică consola!");
    }
};

  return (
    <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        {formData.id ? 'Edit Transaction' : 'Add New Transaction'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          placeholder="Description"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <input 
            type="number" placeholder="Amount"
            className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            required
          />
          <select 
            className="px-4 py-2 rounded-lg border border-gray-200 outline-none"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input 
            type="date"
            className="px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
          <select 
            className="px-4 py-2 rounded-lg border border-gray-200 outline-none"
            value={formData.paymentMethod}
            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
          >
            <option value="CARD">Card</option>
            <option value="CASH">Cash</option>
            <option value="TRANSFER">Transfer</option>
          </select>
        </div>

        <div>
  <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
  <select 
    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
    value={formData.categoryName}
    onChange={(e) => setFormData({...formData, categoryName: e.target.value})}
    required
  >
    <option value="" disabled>Select a category</option>
    {CATEGORIES.map(cat => (
      <option key={cat} value={cat}>
        {cat.charAt(0) + cat.slice(1).toLowerCase()} 
      </option>
    ))}
  </select>
</div>

        <input 
          placeholder="Location"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
        />

        <div className="flex items-center gap-2">
          <input 
            type="checkbox" id="recurring"
            checked={formData.recurring}
            onChange={(e) => setFormData({...formData, recurring: e.target.checked})}
          />
          <label htmlFor="recurring" className="text-sm text-gray-600">Recurring Transaction</label>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
            {formData.id ? 'Update' : 'Save'}
          </button>
          {formData.id && (
            <button type="button" onClick={clearEdit} className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;