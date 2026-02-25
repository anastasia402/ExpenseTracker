package com.interview.demo.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TransactionRequestDTO {
    private String description;
    private Double amount;
    private String currency;
    private LocalDate date;
    private String type;
    private String paymentMethod;
    private String categoryName;

    private boolean recurring;
    private String location;
}
