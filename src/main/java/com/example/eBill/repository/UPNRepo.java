package com.example.eBill.repository;

import com.example.eBill.model.Uplatnica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UPNRepo extends JpaRepository<Uplatnica,Long> {

    Uplatnica findByUniCode(String unicode);

    boolean existsByUniCode(String unicode);
}
