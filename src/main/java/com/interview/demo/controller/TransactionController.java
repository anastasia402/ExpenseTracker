package com.interview.demo.controller;

import com.interview.demo.dto.TransactionRequestDTO;
import com.interview.demo.dto.TransactionResponseDTO;
import com.interview.demo.model.Transaction;
import com.interview.demo.service.TransactionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<TransactionResponseDTO>> getAll() {
        List<Transaction> transactions = transactionService.findAll();

        if (transactions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<TransactionResponseDTO> dtos = transactions.stream()
                .map(transactionService::convertToResponseDTO)
                .toList();

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<TransactionResponseDTO>> getByMonth(
            @RequestParam int year,
            @RequestParam int month) {

        List<Transaction> transactions = transactionService.findByMonthAndYear(year, month);

        List<TransactionResponseDTO> response = transactions.stream()
                .map(transactionService::convertToResponseDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<TransactionResponseDTO> update(@PathVariable Long id, @RequestBody TransactionRequestDTO requestDTO) {
        Transaction updated = transactionService.update(id, requestDTO);
        return ResponseEntity.ok(transactionService.convertToResponseDTO(updated));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (transactionService.findById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        transactionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category")
    public ResponseEntity<List<TransactionResponseDTO>> getByCategory(@RequestParam String name) {
        List<Transaction> results = transactionService.findByCategory(name);

        List<TransactionResponseDTO> dtos = results.stream()
                .map(transactionService::convertToResponseDTO)
                .toList();

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/search")
    public ResponseEntity<List<TransactionResponseDTO>> getByCategoryAndDate(@RequestParam String category,
                                                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<Transaction> results = transactionService.findByCategoryAndDate(category, date);

        List<TransactionResponseDTO> dtos = results.stream()
                .map(transactionService::convertToResponseDTO)
                .toList();

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/details")
    public ResponseEntity<TransactionResponseDTO> getById(@RequestParam Long id) {
        Transaction transaction = transactionService.findById(id);

        if (transaction == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(transactionService.convertToResponseDTO(transaction));
    }

    @PostMapping("/create")
    public ResponseEntity<TransactionResponseDTO> create(@RequestBody TransactionRequestDTO requestDTO) {
        Transaction savedTransaction = transactionService.save(requestDTO);
        return new ResponseEntity<>(
                transactionService.convertToResponseDTO(savedTransaction),
                HttpStatus.CREATED
        );
    }
}
