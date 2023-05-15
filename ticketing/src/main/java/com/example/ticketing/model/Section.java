package com.example.ticketing.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "section")
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String location;
    private String locationUrl;
    private String webUrl;
    private String instagramUrl;
    private String linkedInUrl;
    private String facebookUrl;
    private String tikTokUrl;

    // Relationships
    @ManyToMany(mappedBy = "sections")
    private List<User> users;

    // Constructors, getters, and setters
    public Section() {
    }

    public Section(String name,
                   String description,
                   String location,
                   String locationUrl,
                   String webUrl,
                   String instagramUrl,
                   String linkedInUrl,
                   String facebookUrl,
                   String tikTokUrl,
                   List<User> users) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.locationUrl = locationUrl;
        this.webUrl = webUrl;
        this.instagramUrl = instagramUrl;
        this.linkedInUrl = linkedInUrl;
        this.facebookUrl = facebookUrl;
        this.tikTokUrl = tikTokUrl;
        this.users = users;
    }

    public Section(String name, String description, String location) {
        this.name = name;
        this.description = description;
        this.location = location;
    }

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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLocationUrl() {
        return locationUrl;
    }

    public void setLocationUrl(String locationUrl) {
        this.locationUrl = locationUrl;
    }

    public String getWebUrl() {
        return webUrl;
    }

    public void setWebUrl(String webUrl) {
        this.webUrl = webUrl;
    }

    public String getInstagramUrl() {
        return instagramUrl;
    }

    public void setInstagramUrl(String instagramUrl) {
        instagramUrl = instagramUrl;
    }

    public String getLinkedInUrl() {
        return linkedInUrl;
    }

    public void setLinkedInUrl(String linkedInUrl) {
        linkedInUrl = linkedInUrl;
    }

    public String getFacebookUrl() {
        return facebookUrl;
    }

    public void setFacebookUrl(String facebookUrl) {
        facebookUrl = facebookUrl;
    }

    public String getTikTokUrl() {return tikTokUrl;}

    public void setTikTokUrl(String tikTokUrl) {
        tikTokUrl = tikTokUrl;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}

