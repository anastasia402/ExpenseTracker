import axios from 'axios';

const API_URL = 'http://localhost:8080/api/transactions';

export const getTransactions = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data || []; 
};

export const createTransaction = async (transaction) => {
    const response = await axios.post(`${API_URL}/create`, transaction);
    return response.data;
};

export const deleteTransaction = async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
};

export const updateTransaction = async (id, data) => {
    if (!id) throw new Error("ID is missing for update!");
    
    const response = await axios.put(`${API_URL}/edit/${id}`, data);
    return response.data;
};

export const getTransactionsByMonth = async (year, month) => {
    const response = await axios.get(`${API_URL}/filter`, {
        params: { year, month } 
    });
    return response.data;
};