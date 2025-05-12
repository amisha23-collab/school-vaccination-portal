package com.vaccation.Portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vaccation.Portal.entity.Users;
import com.vaccation.Portal.repository.UsersRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/req")
@AllArgsConstructor
public class AuthUserController {

    @Autowired
    private UsersRepository myAppUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping(value = "/signup", consumes = "application/json")
    public ResponseEntity<?> createUser(@RequestBody Users user) {
        // Allow only Admin role
        if (!user.getRole().equalsIgnoreCase("Admin")) {
            return ResponseEntity
                .badRequest()
                .body("{\"status\":\"error\",\"message\":\"Only Admin role is allowed to register\"}");
        }

        // Check if both username and email already exist
        boolean usernameExists = myAppUserRepository.findByUsername(user.getUsername()).isPresent();
        boolean emailExists = myAppUserRepository.findByEmail(user.getEmail()).isPresent();

        if (usernameExists && emailExists) {
            return ResponseEntity
                    .badRequest()
                    .body("{\"status\":\"error\",\"message\":\"Username and Email already registered\"}");
        } else if (usernameExists) {
            return ResponseEntity
                    .badRequest()
                    .body("{\"status\":\"error\",\"message\":\"Username already registered\"}");
        } else if (emailExists) {
            return ResponseEntity
                    .badRequest()
                    .body("{\"status\":\"error\",\"message\":\"Email already registered\"}");
        }

        // Save user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        myAppUserRepository.save(user);

        return ResponseEntity.ok("{\"status\":\"success\",\"message\":\"User registered successfully\"}");
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<?> login(@RequestBody Users user) {
        // Ensure only Admin role can log in
        var userOptional = myAppUserRepository.findByUsername(user.getUsername());
        if (userOptional.isEmpty() || !userOptional.get().getRole().equalsIgnoreCase("Admin")) {
            return ResponseEntity
                    .status(403)
                    .body("{\"status\":\"error\",\"message\":\"Access denied - Only Admin role users can log in\"}");
        }

        // Authenticate
        org.springframework.security.core.Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return ResponseEntity.ok("{\"status\":\"success\",\"message\":\"Login successful\"}");
    }
}

