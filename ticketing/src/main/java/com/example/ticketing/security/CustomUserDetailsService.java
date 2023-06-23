package com.example.ticketing.security;


import com.example.ticketing.model.Section;
import com.example.ticketing.model.User;
import com.example.ticketing.service.SectionService;
import com.example.ticketing.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserService userService;
    private final SectionService sectionService;

//    @Override
//    public UserDetails loadUserByUsername(String username) {
//        User user = userService.getUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException(String.format("Username %s not found", username)));
//        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole()));
//        return mapUserToCustomUserDetails(user, authorities);
//    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername called for username: " + username + ".");

        Optional<User> userOptional = userService.getUserByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println("User found: " + user.getUsername());

            List<SimpleGrantedAuthority> authorities = Collections.singletonList
                    (new SimpleGrantedAuthority(user.getRole()));
            return mapUserToCustomUserDetails(user, authorities);

        }

        Optional<Section> sectionOptional = sectionService.getSectionByUsername(username);
        if (sectionOptional.isPresent()) {
            Section section = sectionOptional.get();
            System.out.println("Section found: " + section.getUsername());

            List<SimpleGrantedAuthority> authorities = Collections.singletonList
                    (new SimpleGrantedAuthority(section.getRole()));
            return mapSectionToCustomUserDetails(section, authorities);
        }
        System.out.println("Out");
        return null;
    }

    private UserDetails mapSectionToCustomUserDetails(Section section, List<SimpleGrantedAuthority> authorities) {
        CustomUserDetails customUserDetails = new CustomUserDetails();
        customUserDetails.setId(section.getId());
        customUserDetails.setUsername(section.getUsername());
        customUserDetails.setPassword(section.getPassword());
        customUserDetails.setName(section.getName());
        customUserDetails.setActive(true);
        customUserDetails.setAuthorities(authorities);
        return customUserDetails;
    }

    private UserDetails mapUserToCustomUserDetails(User user, List<SimpleGrantedAuthority> authorities) {
        CustomUserDetails customUserDetails = new CustomUserDetails();
        customUserDetails.setId(user.getId());
        customUserDetails.setUsername(user.getUsername());
        customUserDetails.setPassword(user.getPassword());
        customUserDetails.setName(user.getFirstName());
        customUserDetails.setActive(true);
        customUserDetails.setAuthorities(authorities);
        return customUserDetails;
    }
}