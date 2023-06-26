package com.example.ticketing.service;

import com.example.ticketing.model.Event;
import com.example.ticketing.model.Ticket;
import com.example.ticketing.model.User;
import com.example.ticketing.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    @Autowired
    TicketRepository ticketRepository;


    public Ticket saveTicket(Ticket newTicket) {
        return ticketRepository.save(newTicket);
    }

    public List<Ticket> getTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicket(Long id) {
        return ticketRepository.findById(id).get();
    }

    public void delete(Long id) {
        ticketRepository.deleteById(id);
    }

    public Ticket findTicketByContent(String content) {
        return ticketRepository.findByContent(content).get();
    }

    public Ticket findTicketByManually(User user, Event event) {

        return ticketRepository.findByUserAndEvent(user, event).get();
    }

    public void update(Ticket ticket) {
        ticketRepository.save(ticket);
    }

    public List<Ticket> getTicketsByUserId(Long id) {
        return ticketRepository.findByUserId(id);
    }
}
