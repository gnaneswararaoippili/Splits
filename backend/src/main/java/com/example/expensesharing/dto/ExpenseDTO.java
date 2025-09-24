
package com.example.expensesharing.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ExpenseDTO {
    private Long id;
    private Long groupId;
    private String description;
    private Double amount;
    private String paidBy;
    private List<String> splitAmong;
    private String category;
    private LocalDateTime date;
    private Boolean settled;

    public ExpenseDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getPaidBy() {
        return paidBy;
    }

    public void setPaidBy(String paidBy) {
        this.paidBy = paidBy;
    }

    public List<String> getSplitAmong() {
        return splitAmong;
    }

    public void setSplitAmong(List<String> splitAmong) {
        this.splitAmong = splitAmong;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Boolean getSettled() {
        return settled;
    }

    public void setSettled(Boolean settled) {
        this.settled = settled;
    }
}
