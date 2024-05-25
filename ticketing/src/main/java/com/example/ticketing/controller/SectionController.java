package com.example.ticketing.controller;

import com.example.ticketing.model.Event;
import com.example.ticketing.model.Section;
import com.example.ticketing.repository.EventRepository;
import com.example.ticketing.service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/sections")
public class SectionController {

    //private UserService userService;
    private SectionService sectionService;
    private PasswordEncoder passwordEncoder;
    private EventRepository eventRepository;

    public SectionController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    //    @Autowired
//    public void setUserService(UserService userService){
//        this.userService = userService;
//    }
    @Autowired
    public void setSectionService(SectionService sectionService){
        this.sectionService = sectionService;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public Section saveUser(@RequestBody Section user){
        String password = user.getPassword();
        String uname = user.getUsername();
        String mail = user.getEmail();
        //Set<String> authorities = user.getAuthorities();
        String authorities = user.getRole();
        System.out.println("Section: "+uname+" with role: " +authorities);

        Section newSection = new Section(uname, passwordEncoder.encode(password), mail, authorities);
        sectionService.saveSection(newSection);

        return newSection;
    }

    @GetMapping
    public ResponseEntity<List<Section>> getAll() {
        return ResponseEntity.ok(sectionService.getSections());
    }

    @PutMapping("/update")
    public Section updateSection(@RequestBody Section section) {

        Section updatedSection = sectionService.getSectionByUsername(section.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Section not found"));

        updatedSection.setName(section.getName());
        updatedSection.setDescription(section.getDescription());
        updatedSection.setFacebookUrl(section.getFacebookUrl());
        updatedSection.setInstagramUrl(section.getInstagramUrl());
        updatedSection.setLinkedInUrl(section.getLinkedInUrl());
        updatedSection.setTikTokUrl(section.getTikTokUrl());
        updatedSection.setLocation(section.getLocation());
        updatedSection.setLocationUrl(section.getLocationUrl());
        updatedSection.setWebUrl(section.getWebUrl());

        // Only update password if a new password is provided
        String newPassword = section.getPassword();

        if (newPassword != null && !newPassword.isEmpty()) {
            updatedSection.setPassword(passwordEncoder.encode(newPassword));
        }

        sectionService.saveSection(updatedSection);
        return updatedSection;
    }


    @GetMapping("/events/{id}")
    public ResponseEntity<List<Event>> getEventsBySectionId(@PathVariable Long id){
        return ResponseEntity.ok(eventRepository.findBySectionId(id));
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
