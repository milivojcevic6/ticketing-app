//package com.example.ticketing.model;
//
//import jakarta.persistence.*;
//
//import java.util.List;
//import java.util.Set;
//
//@Entity
//@Table(name = "user")
//public class Userr {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(unique = true)
//    private String username;
//    private String password;
//    private String firstName;
//    private String lastName;
//    private String email;
//
//    // Relationships
//    @ManyToMany
//    @JoinTable(
//            name = "user_section",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "section_id")
//    )
//    private List<Section> sections;
//
//    @OneToMany(mappedBy = "userr", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Ticket> tickets;
//
//    @ElementCollection
//    @CollectionTable(name = "user_authorities", joinColumns = @JoinColumn(name = "user_id"))
//    private Set<String> authorities;
//
//    // Constructors, getters, and setters
//    public Userr() {
//    }
//
//    public Userr(String username, String password, String email, Set<String> authorities) {
//        this.username = username;
//        this.password = password;
//        this.email = email;
//        this.authorities = authorities;
//    }
//
//    public Userr(String username,
//                 String password,
//                 String firstName,
//                 String lastName,
//                 String email,
//                 List<Section> sections) {
//        this.username = username;
//        this.password = password;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.sections = sections;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public List<Section> getSections() {
//        return sections;
//    }
//
//    public void setSections(List<Section> sections) {
//        this.sections = sections;
//    }
//
//    public List<Ticket> getTickets() {
//        return tickets;
//    }
//
//    public void setTickets(List<Ticket> tickets) {
//        this.tickets = tickets;
//    }
//
//    public Set<String> getAuthorities() {
//        return authorities;
//    }
//
//    public void setAuthorities(Set<String> authorities) {
//        this.authorities = authorities;
//    }
//}
