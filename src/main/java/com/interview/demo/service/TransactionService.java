package com.interview.demo.service;

import com.interview.demo.enums.CategoryName;
import com.interview.demo.model.Category;
import com.interview.demo.model.Transaction;
import com.interview.demo.repository.CategoryRepository;
import com.interview.demo.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Transaction save(Transaction transaction) {
        if (transaction.getCategory() != null) {
            CategoryName catName = transaction.getCategory().getName();
            Category existingCategory = categoryRepository.findByName(catName)
                    .orElseGet(() -> {
                        Category newCat = new Category();
                        newCat.setName(catName);
                        newCat.setColor("#3498db");
                        return categoryRepository.save(newCat);
                    });
            transaction.setCategory(existingCategory);
        }
        return transactionRepository.save(transaction);
    }

    public List<Transaction> findAll() {
        return (List<Transaction>) this.transactionRepository.findAll();
    }

    public Transaction findById(Long id) {
        return this.transactionRepository.findById(id).orElse(null);
    }

    public void deleteById(Long id) {
        this.transactionRepository.deleteById(id);
    }

    public Transaction update(Transaction transaction) {
        return this.transactionRepository.save(transaction);
    }

    public List<Transaction> findByCategory(String category) {
        return this.transactionRepository.findByCategory(category);
    }

    public List<Transaction> findByCategoryAndDate(String category, LocalDate date) {
        return this.transactionRepository.findByCategoryAndDate(category, date);
    }
}
