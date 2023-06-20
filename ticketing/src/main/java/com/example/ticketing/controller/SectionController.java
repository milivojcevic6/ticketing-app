package com.example.ticketing.controller;

import com.example.ticketing.model.Section;
import com.example.ticketing.model.Userr;
import com.example.ticketing.repository.SectionRepository;
import com.example.ticketing.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/sections")
public class SectionController {

    private UserService userService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void setUserService(UserService userService){
        this.userService = userService;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public Section saveUser(@RequestBody Section user){
        String password = user.getPassword();
        String newpass = passwordEncoder.encode(password);
        String uname = user.getUsername();
        String mail = user.getEmail();
        Set<String> authorities = user.getAuthorities();

        Section newSection = new Section(uname, newpass, mail, authorities);
        userService.addSection(newSection);
        return newSection;
    }


    /*private final SectionRepository sectionRepository;

    @Autowired
    public SectionController(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    @PostMapping
    public ResponseEntity<?> createSection(@RequestBody Section section) {
        // Perform validation and checks before saving the user
        if (section.getUsername() == null || section.getPassword() == null || section.getEmail() == null) {
            return ResponseEntity.badRequest().body("Please provide username, password, and email");
        }
        // Check if the username or email is already taken
        if (sectionRepository.findByUsername(section.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        if (sectionRepository.findByEmail(section.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        Section createdSection = sectionRepository.save(section);
        return ResponseEntity.ok(createdSection);
    }

    @GetMapping("/sections")
    public ResponseEntity<List<Section>> getAllSections() {
        return ResponseEntity.ok(sectionRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Section> getSectionById(@PathVariable Long id) {
        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid section ID: " + id));
        return ResponseEntity.ok(section);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Section> updateSection(@PathVariable Long id, @RequestBody Section updatedSection) {
        Section existingSection = sectionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid section ID: " + id));

        if (updatedSection.getUsername() != null) {
            existingSection.setUsername(updatedSection.getUsername());
        }
        if (updatedSection.getPassword() != null) {
            existingSection.setPassword(updatedSection.getPassword());
        }
        if (updatedSection.getName() != null) {
            existingSection.setName(updatedSection.getName());
        }
        if (updatedSection.getDescription() != null) {
            existingSection.setDescription(updatedSection.getDescription());
        }
        if (updatedSection.getLocation() != null) {
            existingSection.setLocation(updatedSection.getLocation());
        }
        if (updatedSection.getLocationUrl() != null) {
            existingSection.setLocationUrl(updatedSection.getLocationUrl());
        }
        if (updatedSection.getWebUrl() != null) {
            existingSection.setWebUrl(updatedSection.getWebUrl());
        }
        if (updatedSection.getInstagramUrl() != null) {
            existingSection.setInstagramUrl(updatedSection.getInstagramUrl());
        }
        if (updatedSection.getLinkedInUrl() != null) {
            existingSection.setLinkedInUrl(updatedSection.getLinkedInUrl());
        }
        if (updatedSection.getFacebookUrl() != null) {
            existingSection.setFacebookUrl(updatedSection.getFacebookUrl());
        }
        if (updatedSection.getTikTokUrl() != null) {
            existingSection.setTikTokUrl(updatedSection.getTikTokUrl());
        }
        if (updatedSection.getUsers() != null) {
            existingSection.setUsers(updatedSection.getUsers());
        }

        Section savedSection = sectionRepository.save(existingSection);
        return ResponseEntity.ok(savedSection);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSection(@PathVariable Long id) {
        sectionRepository.deleteById(id);
        return ResponseEntity.ok("Section deleted successfully");
    }*/
}
