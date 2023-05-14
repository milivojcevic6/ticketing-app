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
    private String InstagramUrl;
    private String LinkedInUrl;
    private String FacebookUrl;
    private String TikTokUrl;

    // Relationships
    @ManyToMany(mappedBy = "sections")
    private List<User> users;

    // Constructors, getters, and setters

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
        return InstagramUrl;
    }

    public void setInstagramUrl(String instagramUrl) {
        InstagramUrl = instagramUrl;
    }

    public String getLinkedInUrl() {
        return LinkedInUrl;
    }

    public void setLinkedInUrl(String linkedInUrl) {
        LinkedInUrl = linkedInUrl;
    }

    public String getFacebookUrl() {
        return FacebookUrl;
    }

    public void setFacebookUrl(String facebookUrl) {
        FacebookUrl = facebookUrl;
    }

    public String getTikTokUrl() {
        return TikTokUrl;
    }

    public void setTikTokUrl(String tikTokUrl) {
        TikTokUrl = tikTokUrl;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}

