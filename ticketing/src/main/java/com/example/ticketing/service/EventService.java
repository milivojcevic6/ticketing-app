package com.example.ticketing.service;

import com.example.ticketing.model.Event;
import com.example.ticketing.model.Ticket;
import com.example.ticketing.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;


    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event getEvent(Long id) {
        return eventRepository.findById(id).get();
    }

    public List<Event> getEventsByUserId(Long userId) {
        return eventRepository.findEventsByUserId(userId);
    }

}
