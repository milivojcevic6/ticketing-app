package com.example.eBill.controller;

import com.example.eBill.model.Uplatnica;
import com.example.eBill.qrGenerator.QRCodeGenerator;
import com.example.eBill.reqres.UPNRequest;
import com.example.eBill.service.UPNService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import java.io.IOException;
import java.time.LocalDate;
import java.util.UUID;


@RequiredArgsConstructor
@RestController
public class UPNController {

    private final UPNService upnService;

    @RequestMapping("/upn/generate")
    @ResponseBody
    public String generateUPN(@Valid @RequestBody UPNRequest upnRequest) throws IOException {

        System.out.println(upnRequest);

        Uplatnica upn = createUPN(upnRequest);

        upnService.saveUPN(upn);

        QRCodeGenerator.generateQR(upn.toString(), upn.getUniCode());

        return upn.getUniCode() + ".png";
    }

    private Uplatnica createUPN(UPNRequest upnRequest) {
        Uplatnica uplatnica = new Uplatnica();
        uplatnica.setName(upnRequest.getName());
        uplatnica.setAddress(upnRequest.getAddress());
        uplatnica.setCity(upnRequest.getCity());
        uplatnica.setAmount(upnRequest.getAmount());
        uplatnica.setDeadline(LocalDate.parse(upnRequest.getDeadline()));
        uplatnica.setIban(upnRequest.getIban());
        uplatnica.setPaymentCode(upnRequest.getPaymentCode());
        uplatnica.setReference(upnRequest.getReference());
        uplatnica.setDescription(upnRequest.getDescription());
        uplatnica.setUniCode(generateString());
        return uplatnica;
    }

    private String generateString() {
        return UUID.randomUUID().toString();
    }
}
