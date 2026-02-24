package com.interview.demo.repository;

import com.interview.demo.model.Income;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface IncomeRepository extends CrudRepository<Income, Long> {
    List<Income> findIncomeByAmount(Double amount);

    List<Income> findIncomeByDate(LocalDate date);

    List<Income> findIncomeByAmountEquals(Double amount);
}
