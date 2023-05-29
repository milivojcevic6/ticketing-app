package com.example.ticketing.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate issuedDate;
    private TicketStatus status;

    @Lob // Indicates the field will store large binary data
    private byte[] qrCodeImage; // Field to store the binary picture data

    // Relationships
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Userr userr;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    // Constructors, getters, and setters
    public Ticket() {
    }

    public Ticket(LocalDate issuedDate, TicketStatus status, byte[] qrCodeImage, Userr userr, Event event) {
        this.issuedDate = issuedDate;
        this.status = status;
        this.qrCodeImage = qrCodeImage;
        this.userr = userr;
        this.event = event;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getIssuedDate() {
        return issuedDate;
    }

    public void setIssuedDate(LocalDate issuedDate) {
        this.issuedDate = issuedDate;
    }

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }

    public byte[] getQrCodeImage() {
        return qrCodeImage;
    }

    public void setQrCodeImage(byte[] qrCodeImage) {
        this.qrCodeImage = qrCodeImage;
    }

    public Userr getUser() {
        return userr;
    }

    public void setUser(Userr userr) {
        this.userr = userr;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
