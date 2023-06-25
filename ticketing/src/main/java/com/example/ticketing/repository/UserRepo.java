package com.example.ticketing.repository;

import com.example.ticketing.model.Event;
import com.example.ticketing.model.Section;
import com.example.ticketing.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository <User,Long>{

    Optional<User> findByUsername(String username) ;

    boolean existsByUsername(String username);

    Optional<User> getUserById(Long id);

    List<Section> getSectionsById(Long id);


//    Optional<List<Section>> getSectionsByUserId(Long id);
}