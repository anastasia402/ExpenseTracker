package com.interview.demo.controller;

import com.interview.demo.model.Transaction;
import com.interview.demo.service.TransactionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Transaction>> getAll() {
        List<Transaction> transactions = transactionService.findAll();
        if (transactions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(transactions);
    }

    @PutMapping("/edit")
    public ResponseEntity<?> update(@RequestBody Transaction transaction) {
        if (transaction.getId() == null) {
            return ResponseEntity.badRequest().body("No id found");
        }

        Transaction existing = transactionService.findById(transaction.getId());
        if (existing == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No transaction found");
        }

        return ResponseEntity.ok(transactionService.update(transaction));
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> delete(@RequestBody Transaction transaction) {
        if (transaction.getId() == null || transactionService.findById(transaction.getId()) == null) {
            return ResponseEntity.notFound().build();
        }
        transactionService.deleteById(transaction.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category")
    public ResponseEntity<List<Transaction>> getByCategory(@RequestParam String name) {
        List<Transaction> results = transactionService.findByCategory(name);
        if (results.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(results);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Transaction>> getByCategoryAndDate(
            @RequestParam String category,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<Transaction> results = transactionService.findByCategoryAndDate(category, date);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/details")
    public ResponseEntity<Transaction> getById(@RequestParam Long id) {
        Transaction transaction = transactionService.findById(id);
        if (transaction == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(transaction);
    }
}
