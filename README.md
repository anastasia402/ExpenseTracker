A Spring Boot REST API built to manage personal finances, focusing on transaction persistence and monthly filtering.

Tools: Java 21, Spring Boot, JPA/Hibernate, Gemini 
Technical Hurdle: Data Organization (The DTO Challenge)

Problem: At first, the app was trying to send the entire Database Object (Entity) directly to the Frontend. This caused two issues: it shared unnecessary technical details (like internal IDs and complex relationships) and created a "loop" error where the Category and Transaction kept calling each other in a circle.

Fix: I used the DTO (Data Transfer Object) pattern. I prompted the AI to help me create a simple "wrapper" class that only contains the exact data the Frontend needs (like the category name and color as simple text). This made the API faster, the data cleaner, and stopped the "loop" errors immediately.