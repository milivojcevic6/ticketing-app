package com.example.eBill.service;

import com.example.eBill.model.Uplatnica;

import java.util.List;

public interface UPNService {

    List<Uplatnica> getAll();

    Uplatnica saveUPN(Uplatnica uplatnica);

    void deleteUPN();

    Uplatnica findByUnicode(String unicode);

    boolean existsUpn(String unicode);

}
