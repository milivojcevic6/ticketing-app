package com.example.ticketing.service;


import com.example.ticketing.model.Section;
import com.example.ticketing.model.User;

import java.util.List;
import java.util.Optional;

public interface SectionService {

    List<Section> getSections();

    Optional<Section> getSectionByUsername(String username);

    boolean hasSectionWithUsername(String username);

    Section validateAndGetSectionByUsername(String username);

    Section saveSection(Section section);

    void deleteSection(Section section);

    Optional<Section> validUsernameAndPassword(String username, String password);

    Optional<Section> getSectionById(Long id);

}