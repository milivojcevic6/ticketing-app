package com.example.ticketing.controller;

import com.example.ticketing.model.Event;
import com.example.ticketing.model.Section;
import com.example.ticketing.repository.EventRepository;
import com.example.ticketing.service.SectionService;
import com.example.ticketing.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepository;
//    private final UserService userService;

    @Autowired
    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        System.out.println("Event date: " + event.getEventDateTime());
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

        if (updatedEvent.getName() != null && !updatedEvent.getName().isEmpty()) {
            existingEvent.setName(updatedEvent.getName());
        }
        if (updatedEvent.getDescription() != null && !updatedEvent.getDescription().isEmpty()) {
            existingEvent.setDescription(updatedEvent.getDescription());
        }
        if (updatedEvent.getType() != null && !updatedEvent.getType().isEmpty()) {
            existingEvent.setType(updatedEvent.getType());
        }
        if (updatedEvent.getEventDateTime() != null) {
            existingEvent.setEventDateTime(updatedEvent.getEventDateTime());
        }
        if (updatedEvent.getCapacity() != null) {
            existingEvent.setCapacity(updatedEvent.getCapacity());
        }
        if (updatedEvent.getLocation() != null && !updatedEvent.getLocation().isEmpty()) {
            existingEvent.setLocation(updatedEvent.getLocation());
        }
        if (updatedEvent.getLocationUrl() != null && !updatedEvent.getLocationUrl().isEmpty()) {
            existingEvent.setLocationUrl(updatedEvent.getLocationUrl());
        }
        if (updatedEvent.getPrice() != null) {
            existingEvent.setPrice(updatedEvent.getPrice());
        }
        if (updatedEvent.getESNprice() != null) {
            existingEvent.setESNprice(updatedEvent.getESNprice());
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


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Event>> getEventsByUserId(@PathVariable Long userId) {
        List<Event> events = eventRepository.findEventsByUserId(userId);
        return ResponseEntity.ok(events);
    }


//    @GetMapping("/user/{id}")
//    public ResponseEntity<List<Event>> findSubsccriptions(@PathVariable Long id) {
//
//        return ResponseEntity.ok(eventRepository.findEventsByUserId(id));
//    }
//        List<Section> sectionList = userService.getSectionsByUserId(id);
//
//        // Extract section IDs from the sectionList
//        List<Long> sectionIdList = sectionList.stream()
//                .map(Section::getId)
//                .collect(Collectors.toList());
//
//        List<Event> events = eventRepository.findEventsBySectionIdIn(sectionIdList);
//
//        return ResponseEntity.ok(events);
//    }

}
