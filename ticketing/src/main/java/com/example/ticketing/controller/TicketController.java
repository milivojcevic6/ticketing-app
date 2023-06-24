package com.example.ticketing.controller;

import com.example.ticketing.model.Ticket;
import com.example.ticketing.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    private final TicketRepository ticketRepository;

    @Autowired
    public TicketController(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) throws IOException {
        Ticket newTicket = new Ticket(ticket.getIssuedDate(), ticket.getUser(), ticket.getEvent());
        Ticket createdTicket = ticketRepository.save(newTicket);
        return ResponseEntity.ok(createdTicket);
    }

    @GetMapping("/test")
    public ResponseEntity<byte[]> test() {
        byte[] qrCodeBytes = getTicketById(1L).getBody().getQrCodeImage();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentLength(qrCodeBytes.length);
        return new ResponseEntity<>(qrCodeBytes, headers, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(ticketRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid ticket ID: " + id));
        return ResponseEntity.ok(ticket);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long id, @RequestBody Ticket updatedTicket) {
        Ticket existingTicket = ticketRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid ticket ID: " + id));

        if (updatedTicket.getIssuedDate() != null) {
            existingTicket.setIssuedDate(updatedTicket.getIssuedDate());
        }
        if (updatedTicket.getStatus() != null) {
            existingTicket.setStatus(updatedTicket.getStatus());
        }
        if (updatedTicket.getQrCodeImage() != null) {
            existingTicket.setQrCodeImage(updatedTicket.getQrCodeImage());
        }
        if (updatedTicket.getUser() != null) {
            existingTicket.setUser(updatedTicket.getUser());
        }
        if (updatedTicket.getEvent() != null) {
            existingTicket.setEvent(updatedTicket.getEvent());
        }
        // Update other attributes as needed

        Ticket savedTicket = ticketRepository.save(existingTicket);
        return ResponseEntity.ok(savedTicket);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long id) {
        ticketRepository.deleteById(id);
        return ResponseEntity.ok("Ticket deleted successfully");
    }
}
