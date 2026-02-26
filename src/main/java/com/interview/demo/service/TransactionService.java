package com.interview.demo.service;

import com.interview.demo.dto.TransactionRequestDTO;
import com.interview.demo.dto.TransactionResponseDTO;
import com.interview.demo.enums.CategoryName;
import com.interview.demo.enums.Currency;
import com.interview.demo.enums.PaymentMethod;
import com.interview.demo.model.Category;
import com.interview.demo.model.Expense;
import com.interview.demo.model.Income;
import com.interview.demo.model.Transaction;
import com.interview.demo.repository.CategoryRepository;
import com.interview.demo.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Transaction save(TransactionRequestDTO dto) {
        Transaction transaction;

        if ("INCOME".equalsIgnoreCase(dto.getType())) {
            Income income = new Income();
            income.setRecurring(dto.isRecurring());
            transaction = income;
        } else {
            Expense expense = new Expense();
            expense.setLocation(dto.getLocation());
            transaction = expense;
        }

        try {
            if (dto.getCurrency() == null)
                throw new IllegalArgumentException();

            transaction.setCurrency(Currency.valueOf(dto.getCurrency().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid currency: '" + dto.getCurrency() + "'. Supported currencies are: RON.");
        }

        transaction.setDescription(dto.getDescription());
        transaction.setAmount(dto.getAmount());
        transaction.setDate(dto.getDate());
        transaction.setPaymentMethod(PaymentMethod.valueOf(dto.getPaymentMethod()));
        transaction.setRecurring(dto.isRecurring());
        try {
            transaction.setPaymentMethod(PaymentMethod.valueOf(dto.getPaymentMethod().toUpperCase()));
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new RuntimeException("Invalid payment method. Use: CASH, CARD, or TRANSFER.");
        }

        if (dto.getCategoryName() != null) {
            Category category = categoryRepository.findByName(CategoryName.valueOf(dto.getCategoryName()))
                    .orElseGet(() -> {
                        Category newCat = new Category();
                        newCat.setName(CategoryName.valueOf(dto.getCategoryName()));
                        return categoryRepository.save(newCat);
                    });
            transaction.setCategory(category);
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

    public Transaction update(Long id, TransactionRequestDTO dto) {
        Transaction existing = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        existing.setDescription(dto.getDescription());
        existing.setAmount(dto.getAmount());
        existing.setDate(dto.getDate());
        existing.setRecurring(dto.isRecurring());

        try {
            if (dto.getCurrency() != null) {
                existing.setCurrency(Currency.valueOf(dto.getCurrency().toUpperCase()));
            }
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid currency: " + dto.getCurrency());
        }

        try {
            if (dto.getPaymentMethod() != null) {
                existing.setPaymentMethod(PaymentMethod.valueOf(dto.getPaymentMethod().toUpperCase()));
            }
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new RuntimeException("Invalid payment method. Use: CASH, CARD, or TRANSFER.");
        }

        if (existing instanceof Income) {
            ((Income) existing).setRecurring(dto.isRecurring());
        } else if (existing instanceof Expense) {
            ((Expense) existing).setLocation(dto.getLocation());
        }

        if (dto.getCategoryName() != null) {
            Category category = categoryRepository.findByName(CategoryName.valueOf(dto.getCategoryName()))
                    .orElseGet(() -> {
                        Category newCat = new Category();
                        newCat.setName(CategoryName.valueOf(dto.getCategoryName()));;
                        return categoryRepository.save(newCat);
                    });
            existing.setCategory(category);
        }

        return transactionRepository.save(existing);
    }

    public List<Transaction> findByCategory(String category) {
        return this.transactionRepository.findByCategory(category);
    }

    public List<Transaction> findByCategoryAndDate(String category, LocalDate date) {
        return this.transactionRepository.findByCategoryAndDate(category, date);
    }

    public TransactionResponseDTO convertToResponseDTO(Transaction transaction) {
        TransactionResponseDTO dto = new TransactionResponseDTO();

        dto.setId(transaction.getId());
        dto.setDescription(transaction.getDescription());
        dto.setAmount(transaction.getAmount());
        dto.setDate(transaction.getDate());
        dto.setCurrency(String.valueOf(transaction.getCurrency()));
        dto.setPaymentMethod(String.valueOf(transaction.getPaymentMethod()));
        dto.setRecurring(transaction.isRecurring());

        dto.setSignedAmount(transaction.getSignedAmount());

        if (transaction instanceof Income) {
            dto.setType("INCOME");
        } else if (transaction instanceof Expense) {
            dto.setType("EXPENSE");
        }

        if (transaction.getCategory() != null) {
            dto.setCategoryName(transaction.getCategory().getName().name());
        }
        return dto;
    }

    public List<Transaction> findByMonthAndYear(int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = YearMonth.of(year, month).atEndOfMonth();

        return transactionRepository.findByDateBetween(startDate, endDate);
    }
}
