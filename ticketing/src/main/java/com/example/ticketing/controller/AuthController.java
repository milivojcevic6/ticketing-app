package com.example.ticketing.controller;


import com.example.ticketing.model.Section;
import com.example.ticketing.model.User;
import com.example.ticketing.reqres.AuthResponse;
import com.example.ticketing.reqres.LoginRequest;
import com.example.ticketing.security.CustomUserDetails;
import com.example.ticketing.security.CustomUserDetailsService;
import com.example.ticketing.service.SectionService;
import com.example.ticketing.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final SectionService sectionService;

    private final CustomUserDetailsService currentUser;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userService.validUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            CustomUserDetails userDetails = new CustomUserDetails(user);
            currentUser.loadUserByUsername(userDetails.getUsername());
            return ResponseEntity.ok(new AuthResponse(user.getId(), user.getFirstName(), user.getRole()));
        }
        Optional<Section> sectionOptional = sectionService.validUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
        if (sectionOptional.isPresent()) {
            Section section = sectionOptional.get();
            CustomUserDetails userDetails = new CustomUserDetails(section);
            currentUser.loadUserByUsername(userDetails.getUsername());
            return ResponseEntity.ok(new AuthResponse(section.getId(), section.getName(), section.getRole()));
        }
        System.out.println("out++++++++++=");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}