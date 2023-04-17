package com.example.eBill.repository;

import com.example.eBill.model.IBAN;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IBANRepo extends JpaRepository<IBAN,Long> {

    Optional<IBAN> findIBANByNumber (String number);

    IBAN findById(IBAN x);

    boolean existsByNumber(String number);

}
