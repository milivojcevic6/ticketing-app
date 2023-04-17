package com.example.eBill.repository;

import com.example.eBill.model.PaymentCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository <PaymentCode, Long> {
    Optional<PaymentCode> findPaymentCodeByCode(String code);

    Optional<PaymentCode> findByCode(String code);
}