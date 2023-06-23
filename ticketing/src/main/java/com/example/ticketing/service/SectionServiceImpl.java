package com.example.ticketing.service;

import com.example.ticketing.model.Section;
import com.example.ticketing.model.User;
import com.example.ticketing.repository.SectionRepo;
import com.example.ticketing.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SectionServiceImpl implements SectionService {

    private final SectionRepo sectionRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<Section> getSections() {
        return sectionRepo.findAll();
    }

    @Override
    public Optional<Section> getSectionByUsername(String username) {
        return sectionRepo.findByUsername(username);
    }

    @Override
    public boolean hasSectionWithUsername(String username) {
        return sectionRepo.existsByUsername(username);
    }

    @Override
    public Section validateAndGetSectionByUsername(String username) {
        return getSectionByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Section with username "+ username+" not found"));
    }

    @Override
    public Section saveSection(Section section) {
        section.setPassword(passwordEncoder.encode(section.getPassword()));
        return sectionRepo.save(section);
    }

    @Override
    public void deleteSection(Section section) {
        sectionRepo.delete(section);
    }

    @Override
    public Optional<Section> validUsernameAndPassword(String username, String password) {
        return getSectionByUsername(username)
                .filter(section -> passwordEncoder.matches(password, section.getPassword()));
    }

    @Override
    public Optional<Section> getUserById(Long id) {
        return sectionRepo.getUserById(id);
    }
}