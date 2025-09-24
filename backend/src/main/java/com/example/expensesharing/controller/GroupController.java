
package com.example.expensesharing.controller;

import com.example.expensesharing.dto.GroupDTO;
import com.example.expensesharing.dto.MemberDTO;
import com.example.expensesharing.model.GroupEntity;
import com.example.expensesharing.repository.GroupRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "http://localhost:5173")
public class GroupController {

    @Autowired
    private GroupRepository groupRepository;

    private final ObjectMapper mapper = new ObjectMapper();

    @GetMapping
    public List<GroupDTO> getAll() {
        return groupRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public GroupDTO create(@RequestBody GroupDTO dto) throws Exception {
        GroupEntity e = new GroupEntity();
        e.setName(dto.getName());
        e.setDescription(dto.getDescription());
        e.setMembersJson(mapper.writeValueAsString(dto.getMembers()));
        e.setCreatedAt(LocalDateTime.now());
        GroupEntity saved = groupRepository.save(e);
        return toDto(saved);
    }

    private GroupDTO toDto(GroupEntity e) {
        GroupDTO dto = new GroupDTO();
        dto.setId(e.getId());
        dto.setName(e.getName());
        dto.setDescription(e.getDescription());
        try {
            List<MemberDTO> members = mapper.readValue(e.getMembersJson() == null ? "[]" : e.getMembersJson(),
                    new TypeReference<List<MemberDTO>>(){});
            dto.setMembers(members);
        } catch (Exception ex) {
            dto.setMembers(List.of());
        }
        dto.setCreatedAt(e.getCreatedAt());
        return dto;
    }
}
