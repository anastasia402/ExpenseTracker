package com.interview.demo.repository;

import com.interview.demo.model.Transaction;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends CrudRepository<Transaction, Long> {
    List<Transaction> findByCategory(String category);

    List<Transaction> findByCategoryAndDate(String category, LocalDate date);

    List<Transaction> findByDateBetween(LocalDate start, LocalDate end);
}
