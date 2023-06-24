package com.example.ticketing.controller;

import com.example.ticketing.model.Event;
import com.example.ticketing.model.Ticket;
import com.example.ticketing.model.User;
import com.example.ticketing.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.example.ticketing.model.TicketStatus.ACTIVE;
import static com.example.ticketing.model.TicketStatus.USED;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) throws IOException {
        Ticket newTicket = new Ticket(ticket.getIssuedDate(), ticket.getUser(), ticket.getEvent());
        Ticket createdTicket = ticketService.saveTicket(newTicket);
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
        return ResponseEntity.ok(ticketService.getTickets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        Ticket ticket = ticketService.getTicket(id);
        return ResponseEntity.ok(ticket);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long id, @RequestBody Ticket updatedTicket) {
        Ticket existingTicket = ticketService.getTicket(id);

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

        Ticket savedTicket = ticketService.saveTicket(existingTicket);
        return ResponseEntity.ok(savedTicket);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long id) {
        ticketService.delete(id);
        return ResponseEntity.ok("Ticket deleted successfully");
    }

    @GetMapping("/check/{content}")
    public String checkTicketContent(@PathVariable String content) {
        Ticket ticket = ticketService.findTicketByContent(content);
        if (ticket != null) {
            if(ticket.getStatus().toString().equals("USED"))
                return "Already used!";
            ticket.setStatus(USED);
            ticketService.update(ticket);
            return "Success";
        } else {
            return "Failed";
        }
    }


    @GetMapping("/check")
    public String checkTicketManually(@RequestBody User user, @RequestBody Event event) {
        Ticket ticket = ticketService.findTicketByManually(user, event);
        if (ticket != null) {
            System.out.println("NOT NULL");
            if(ticket.getStatus() == USED)
                return "Already used!";
            ticket.setStatus(USED);
            ticketService.update(ticket);
            return "Success";
        } else {
            return "Failed";
        }
    }

}
