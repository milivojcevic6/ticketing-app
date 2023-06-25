package com.example.ticketing.repository;

import com.example.ticketing.model.Event;
import com.example.ticketing.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findBySectionId(Long id);
    // You can define additional custom queries or methods if needed

//    @Query("SELECT e FROM Event e JOIN e.section_id s JOIN s.users u WHERE u.id = :userId")
//    List<Event> findEventsByUserId(@Param("userId") Long userId);


//    Optional<List<Event>> findEventsBySection(Long userId);


//    Optional<List<Event>> findEventsBySectionIds(List<Section> sections);

    //List<Event> findEventsBySectionIdIn(List<Long> sectionIds);

    //@Query("SELECT e FROM Event e JOIN UserSection us ON e.section.id = us.section.id WHERE us.user.id = :userId")
    //List<Event> findEventsByUserId(@Param("userId") Long userId);


    @Query("SELECT e FROM Event e JOIN e.section s JOIN s.users u WHERE u.id = :userId")
    List<Event> findEventsByUserId(@Param("userId") Long userId);

}
