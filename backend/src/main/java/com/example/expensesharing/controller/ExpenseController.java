
package com.example.expensesharing.controller;

import com.example.expensesharing.dto.ExpenseDTO;
import com.example.expensesharing.model.ExpenseEntity;
import com.example.expensesharing.repository.ExpenseRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    private final ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/{groupId}")
    public List<ExpenseDTO> getByGroup(@PathVariable Long groupId) {
        return expenseRepository.findByGroupId(groupId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ExpenseDTO create(@RequestBody ExpenseDTO dto) throws Exception {
        ExpenseEntity e = new ExpenseEntity();
        e.setGroupId(dto.getGroupId());
        e.setDescription(dto.getDescription());
        e.setAmount(dto.getAmount());
        e.setPaidBy(dto.getPaidBy());
        e.setSplitAmongJson(mapper.writeValueAsString(dto.getSplitAmong()));
        e.setCategory(dto.getCategory());
        e.setDate(dto.getDate());
        e.setSettled(dto.getSettled() == null ? false : dto.getSettled());
        ExpenseEntity saved = expenseRepository.save(e);
        return toDto(saved);
    }

    private ExpenseDTO toDto(ExpenseEntity e) {
        ExpenseDTO dto = new ExpenseDTO();
        dto.setId(e.getId());
        dto.setGroupId(e.getGroupId());
        dto.setDescription(e.getDescription());
        dto.setAmount(e.getAmount());
        dto.setPaidBy(e.getPaidBy());
        try {
            List<String> split = mapper.readValue(e.getSplitAmongJson() == null ? "[]" : e.getSplitAmongJson(),
                    new TypeReference<List<String>>(){});
            dto.setSplitAmong(split);
        } catch (Exception ex) {
            dto.setSplitAmong(List.of());
        }
        dto.setCategory(e.getCategory());
        dto.setDate(e.getDate());
        dto.setSettled(e.getSettled());
        return dto;
    }
}
