package com.interview.demo.model;

import com.interview.demo.enums.CategoryName;
import com.interview.demo.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Currency;

@Entity
@Table(name = "transactions")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "transaction_type")
@Data
public abstract class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private Double amount;
    private Currency currency;
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private PaymentMethod paymentMethod;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public abstract Double getSignedAmount();
}
