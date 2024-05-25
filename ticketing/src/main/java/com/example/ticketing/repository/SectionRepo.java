package com.example.ticketing.repository;

import com.example.ticketing.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SectionRepo extends JpaRepository <Section,Long>{

    Optional<Section> findByUsername(String username) ;

    boolean existsByUsername(String username);

    Optional<Section> getSectionById(Long id);
}