package com.example.ticketing.repository;

import com.example.ticketing.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    // You can define additional custom queries or methods if needed

}
