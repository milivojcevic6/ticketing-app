package com.example.ticketing.controller;

import com.example.ticketing.model.Event;
import com.example.ticketing.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepository;

    @Autowired
    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event createdEvent = eventRepository.save(event);
        return ResponseEntity.ok(createdEvent);
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid event ID: " + id));
        return ResponseEntity.ok(event);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid event ID: " + id));

        if (updatedEvent.getName() != null) {
            existingEvent.setName(updatedEvent.getName());
        }
        if (updatedEvent.getDescription() != null) {
            existingEvent.setDescription(updatedEvent.getDescription());
        }
        if (updatedEvent.getType() != null) {
            existingEvent.setType(updatedEvent.getType());
        }
        if (updatedEvent.getEventDateTime() != null) {
            existingEvent.setEventDateTime(updatedEvent.getEventDateTime());
        }
        if (updatedEvent.getCapacity() != null) {
            existingEvent.setCapacity(updatedEvent.getCapacity());
        }
        if (updatedEvent.getLocation() != null) {
            existingEvent.setLocation(updatedEvent.getLocation());
        }
        if (updatedEvent.getLocationUrl() != null) {
            existingEvent.setLocationUrl(updatedEvent.getLocationUrl());
        }
        if (updatedEvent.getPrice() != null) {
            existingEvent.setPrice(updatedEvent.getPrice());
        }
        if (updatedEvent.getESNprice() != null) {
            existingEvent.setESNprice(updatedEvent.getESNprice());
        }
        if (updatedEvent.getSection() != null) {
            existingEvent.setSection(updatedEvent.getSection());
        }
        if (updatedEvent.getTickets() != null) {
            existingEvent.setTickets(updatedEvent.getTickets());
        }

        // Save the updated event
        Event savedEvent = eventRepository.save(existingEvent);
        return ResponseEntity.ok(savedEvent);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid event ID: " + id));

        eventRepository.delete(event);
        return ResponseEntity.ok("Event deleted successfully");
    }
}
