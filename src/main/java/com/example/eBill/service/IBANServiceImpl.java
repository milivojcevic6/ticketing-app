package com.example.eBill.service;

import com.example.eBill.model.IBAN;
import com.example.eBill.repository.IBANRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class IBANServiceImpl implements IBANService{

    private final IBANRepo ibanRepo;
    @Override
    public List<IBAN> getIBANs() {
        return ibanRepo.findAll();
    }

    @Override
    public IBAN saveIBAN(IBAN iban) {
        return ibanRepo.save(iban);
    }

    @Override
    public void deleteIBAN(IBAN iban) {
        ibanRepo.delete(iban);
    }

    @Override
    public boolean existsByNumber(String number) {
        return ibanRepo.existsByNumber(number);
    }
}
