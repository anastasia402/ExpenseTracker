package com.interview.demo.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
@DiscriminatorValue("EXPENSE")
public class Expense extends Transaction {

    private String location;

    @Override
    public Double getSignedAmount() {
        return -getAmount();
    }
}