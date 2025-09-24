
package com.example.expensesharing.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "groups_table")
public class GroupEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    /**
     * Members stored as JSON string (serialized list of MemberDTO on the controller side)
     */
    @Column(columnDefinition = "LONGTEXT")
    private String membersJson;

    private LocalDateTime createdAt;

    public GroupEntity() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMembersJson() {
        return membersJson;
    }

    public void setMembersJson(String membersJson) {
        this.membersJson = membersJson;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
