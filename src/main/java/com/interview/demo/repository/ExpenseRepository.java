package com.interview.demo.repository;

import com.interview.demo.model.Expense;
import org.springframework.data.repository.CrudRepository;

public interface ExpenseRepository extends CrudRepository<Expense, Long> {
}
