package com.example.ticketing.controller;

import com.example.ticketing.model.Event;
import com.example.ticketing.model.Section;
import com.example.ticketing.model.Ticket;
import com.example.ticketing.model.User;
import com.example.ticketing.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    /*Autowired
    private UserRepository userRepository;*/

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

    @GetMapping
    public ResponseEntity<List<User>> getAllEvents() {
        List<User> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/register")
    public User saveUser(@RequestBody User user){
        System.out.println(user.toString());
        String password = user.getPassword();
        String uname = user.getUsername();
        String mail = user.getEmail();
        String authorities = user.getRole();

        System.out.println("User: "+uname+" with role: " + user.getRole());
        User newUser = new User(uname, passwordEncoder.encode(password), mail, authorities);
        userService.saveUser(newUser);
        return newUser;
    }

    @PutMapping("/update")
    public User updateUser(@RequestBody User user) {

        User updatedUser = userService.getUserById(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setEmail(user.getEmail());

        // Only update password if a new password is provided
        String newPassword = user.getPassword();

        if (newPassword != null && !newPassword.isEmpty()) {
            updatedUser.setPassword(passwordEncoder.encode(newPassword));
        }

        updatedUser.setSections(user.getSections());

        userService.saveUser(updatedUser);
        return updatedUser;
    }

//    @PutMapping("/update")
//    public User updateUser(@RequestParam(required = false) String firstName,
//                           @RequestParam(required = false) String lastName,
//                           @RequestParam(required = false) String email,
//                           @RequestParam(required = false) String password,
//                           @RequestParam(required = false) List<Section> sections,
//                           @RequestParam(required = false) List<Ticket> tickets,
//                           @RequestParam Long userId) {
//        User updatedUser = userService.getUserById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
//
//        if (firstName != null) {
//            updatedUser.setFirstName(firstName);
//        }
//        if (lastName != null) {
//            updatedUser.setLastName(lastName);
//        }
//        if (email != null) {
//            updatedUser.setEmail(email);
//        }
//        if (password != null) {
//            updatedUser.setPassword(password);
//        }
//        if (sections != null) {
//            updatedUser.setSections(sections);
//        }
//        if (tickets != null) {
//            updatedUser.setTickets(tickets);
//        }
//
//        // Update other attributes as needed
//
//        userService.saveUser(updatedUser);
//        return updatedUser;
//    }


//    @PutMapping("/update")
//    public User updateUser(@RequestBody User user){
//        User updated = userService.getUserById(user.getId()).get();
//        updated.setFirstName(user.getFirstName());
//        updated.setLastName(user.getLastName());
//        updated.setEmail(user.getEmail());
//        updated.setPassword(user.getPassword());
//        updated.setSections(user.getSections());
//        updated.setTickets(user.getTickets());
//        userService.saveUser(updated);
//        return updated;
//    }

    @PostMapping("/delete/{id}")
    public void deleteUser(@PathVariable String id){
        userService.deleteUser(userService.getUserById(Long.parseLong(id)).get());
    }

    // Endpoint for user registration
    /*@PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Userr userr) {
        // Perform validation and checks before saving the user
        if (userr.getUsername() == null || userr.getPassword() == null || userr.getEmail() == null) {
            return ResponseEntity.badRequest().body("Please provide username, password, and email");
        }

        // Check if the username or email is already taken
        if (userRepository.findByUsername(userr.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        if (userRepository.findByEmail(userr.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Save the user to the database
        userRepository.save(userr);

        // Return a success response
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/users")
    ResponseEntity<List<Userr>> getAllUsers(){
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Userr> getUserById(@PathVariable Long id) {
        Userr userr = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + id));
        return ResponseEntity.ok(userr);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Userr> updateUser(@PathVariable Long id, @RequestBody Userr updatedUserr) {
        Userr existingUserr = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + id));

        if (updatedUserr.getUsername() != null) {
            existingUserr.setUsername(updatedUserr.getUsername());
        }
        if (updatedUserr.getPassword() != null) {
            existingUserr.setPassword(updatedUserr.getPassword());
        }
        if (updatedUserr.getFirstName() != null) {
            existingUserr.setFirstName(updatedUserr.getFirstName());
        }
        if (updatedUserr.getLastName() != null) {
            existingUserr.setLastName(updatedUserr.getLastName());
        }
        if (updatedUserr.getEmail() != null) {
            existingUserr.setEmail(updatedUserr.getEmail());
        }
        if (updatedUserr.getSections() != null) {
            existingUserr.setSections(updatedUserr.getSections());
        }

        Userr savedUserr = userRepository.save(existingUserr);
        return ResponseEntity.ok(savedUserr);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }*/

}