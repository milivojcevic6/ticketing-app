package com.example.eBill.service;

import com.example.eBill.model.IBAN;

import java.util.List;

public interface IBANService {

    List<IBAN> getIBANs();

    IBAN saveIBAN(IBAN iban);

    void deleteIBAN(IBAN iban);

    boolean existsByNumber(String number);
}
