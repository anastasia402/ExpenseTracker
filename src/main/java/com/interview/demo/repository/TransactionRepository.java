package com.interview.demo.repository;

import com.interview.demo.enums.PaymentMethod;
import com.interview.demo.model.Transaction;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends CrudRepository<Transaction, Long> {
    List<Transaction> findByCategory(String category);

    List<Transaction> findByCategoryAndDate(String category, LocalDate date);

    List<Transaction> findTransactionByAmountEquals(Double amount);

    List<Transaction> findTransactionByAmountGreaterThan(Double amount);

    List<Transaction> findTransactionByAmountLessThan(Double amount);

    List<Transaction> findTransactionByPaymentMethodEquals(PaymentMethod paymentMethod);
}
