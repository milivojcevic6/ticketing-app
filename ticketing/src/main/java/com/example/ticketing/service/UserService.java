package com.example.ticketing.service;

import com.example.ticketing.model.Section;
import com.example.ticketing.model.Userr;
import com.example.ticketing.repository.SectionRepository;
import com.example.ticketing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    SectionRepository sectionRepository;

    //Constructor

    /*public UserService(UserRepository userRepository) {
        super();
        this.userRepository = userRepository;
    }*/

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Userr userr = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("username doesn't exist"));
        User  newUser;

        if(userr != null){
            String uname = userr.getUsername();
            String pass = userr.getPassword();
            Set<String> authorities = userr.getAuthorities();
            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
            grantedAuthorities = authorities.stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toSet());
            newUser = new User(uname, pass, grantedAuthorities);
            return newUser;

        }
        else{
            Section section = sectionRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("username doesn't exist"));
            String uname = section.getUsername();
            String pass = section.getPassword();
            Set<String> authorities = section.getAuthorities();
            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
            grantedAuthorities = authorities.stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toSet());
            newUser = new User(uname, pass, grantedAuthorities);
            return newUser;
        }

    }

    public Userr addUser(Userr user){
        return userRepository.save(user);
    }

    public Section addSection(Section section){
        return sectionRepository.save(section);
    }
}
