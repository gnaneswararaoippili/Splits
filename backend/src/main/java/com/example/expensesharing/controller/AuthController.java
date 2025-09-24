package com.example.expensesharing.controller;

import com.example.expensesharing.model.UserEntity;
import com.example.expensesharing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // adjust if frontend runs elsewhere
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Sign Up
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody UserEntity user) {
        Optional<UserEntity> existing = userRepository.findByEmail(user.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Email already registered!"));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword())); // hash password
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("success", true, "message", "User registered successfully!"));
    }

    // Sign In
    @PostMapping("/signin")
    public ResponseEntity<Map<String, Object>> signin(@RequestBody UserEntity loginUser) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(loginUser.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Invalid email or password"));
        }

        UserEntity user = userOpt.get();
        if (!passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Invalid email or password"));
        }

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Login successful!",
            "userId", user.getId(),
            "email", user.getEmail(),
            "name", user.getName()
        ));
    }
}