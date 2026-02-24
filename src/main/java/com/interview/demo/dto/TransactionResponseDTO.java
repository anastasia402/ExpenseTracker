package com.interview.demo.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class TransactionResponseDTO {
    private Long id;
    private String description;
    private Double amount;
    private Double signedAmount;
    private LocalDate date;

    private String type;
    private String categoryName;
    private String categoryColor;

    private boolean urgent;
    private String note;
}

//public TransactionResponseDTO toDto(Transaction entity) {
//    TransactionResponseDTO dto = new TransactionResponseDTO();
//    dto.setId(entity.getId());
//    dto.setDescription(entity.getDescription());
//    dto.setAmount(entity.getAmount());
//    dto.setSignedAmount(entity.getSignedAmount());
//    dto.setDate(entity.getDate());
//
//    // Identificăm tipul folosind "instanceof" (Principiu OOP)
//    if (entity instanceof Income) {
//        dto.setType("INCOME");
//    } else {
//        dto.setType("EXPENSE");
//    }
//
//    if (entity.getCategory() != null) {
//        dto.setCategoryName(entity.getCategory().getName().name());
//        dto.setCategoryColor(entity.getCategory().getColor());
//    }
//
//    return dto;
//}
