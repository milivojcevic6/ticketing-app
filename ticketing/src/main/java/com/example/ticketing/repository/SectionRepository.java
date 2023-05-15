package com.example.ticketing.repository;

import com.example.ticketing.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionRepository extends JpaRepository<Section, Long> {
    Section findByUsername(String username);
    Section findByEmail(String email);
    // Other custom queries if needed
}
