package com.interview.demo.repository;

import com.interview.demo.enums.CategoryName;
import com.interview.demo.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(CategoryName name);
}
