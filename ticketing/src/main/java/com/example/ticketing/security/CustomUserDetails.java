package com.example.ticketing.security;

import com.example.ticketing.model.Section;
import com.example.ticketing.model.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class CustomUserDetails implements UserDetails {

    private Long id;
    private String username;
    private String password;
    private boolean isActive;
    private String name;
    private Collection<? extends GrantedAuthority> authorities;


    public CustomUserDetails() {
    }

    public CustomUserDetails(User user) {
        this.username=user.getUsername();
        this.password=user.getPassword();
        this.name= user.getFirstName();
        this.isActive=true;
        this.authorities = Arrays.stream(user.getRole().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        System.out.println(this.authorities.toString()+" ovo user");

    }

    public CustomUserDetails(Section section) {
        this.username=section.getUsername();
        this.password=section.getPassword();
        this.name= section.getName();
        this.isActive=true;
        this.authorities = Arrays.stream(section.getRole().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        System.out.println(this.authorities.toString()+" ovo");
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public String getName() {
        return name;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }
}