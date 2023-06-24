package com.example.ticketing.repository;

import com.example.ticketing.model.Event;
import com.example.ticketing.model.Ticket;
import com.example.ticketing.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    Optional<Ticket> findByContent(String content);

    Optional<Ticket> findByUserAndEvent(User user, Event event);
}
