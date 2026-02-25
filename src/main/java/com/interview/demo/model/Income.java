package com.interview.demo.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
@DiscriminatorValue("INCOME")
public class Income extends Transaction {

    private boolean isRecurring;

    @Override
    public Double getSignedAmount() {
        return getAmount();
    }

}