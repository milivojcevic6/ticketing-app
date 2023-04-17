package com.example.eBill.service;

import com.example.eBill.model.Uplatnica;
import com.example.eBill.repository.UPNRepo;
import com.example.eBill.reqres.UPNRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UPNServiceImpl implements UPNService{

    private final UPNRepo upnRepo;

    @Override
    public List<Uplatnica> getAll() {
        return upnRepo.findAll();
    }

    @Override
    public Uplatnica saveUPN(Uplatnica uplatnica) {
        return  upnRepo.save(uplatnica);
    }

    @Override
    public Uplatnica findByUnicode(String unicode) {
        return upnRepo.findByUniCode(unicode);
    }
    @Override
    public boolean existsUpn(String unicode) {return upnRepo.existsByUniCode(unicode);}

    @Override
    public void deleteUPN() {

    }
}
