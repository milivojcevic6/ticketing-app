package com.example.ticketing.model;

import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String type;
    private Long capacity;
    private String location;
    private String locationUrl;
    private Double price;
    private Double ESNprice;

    // Relationships

    @ManyToOne
    @JoinColumn(name = "section_id")
    private Section section;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ticket> tickets;

    // Constructors, getters, and setters
    public Event() {
    }

    public Event(String name,
                 String description,
                 String type,
                 Long capacity,
                 String location,
                 String locationUrl,
                 Double price,
                 Double ESNprice,
                 Section section) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.capacity = capacity;
        this.location = location;
        this.locationUrl = locationUrl;
        this.price = price;
        this.ESNprice = ESNprice;
        this.section = section;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getESNprice() {
        return ESNprice;
    }

    public void setESNprice(Double ESNprice) {
        this.ESNprice = ESNprice;
    }

    public Section getSection() {return section;}

    public void setSection(Section section) {this.section = section;}

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }
}
