package com.example.eBill.service;

import com.example.eBill.model.PaymentCode;
import com.example.eBill.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PaymentCodeService {

    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentCodeService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<PaymentCode> getPaymentCodes(){
        return paymentRepository.findAll();
    }

    public void createCode(@RequestBody PaymentCode code) {

        Optional<PaymentCode> codeOptional= paymentRepository.findPaymentCodeByCode(code.getCode());
        if(codeOptional.isPresent()){
            System.out.println("Try again");
        }
        else{
            paymentRepository.save(code);
        }
    }

    public void deleteCode(Long id) {

        boolean exists = paymentRepository.existsById(id);
        if(exists){
            System.out.println("Try again");
        }
        else{
            paymentRepository.deleteById(id);
        }
    }

    public void updateCode(Long codeId, String code, String slo, String eng) {

        PaymentCode paymentCode = paymentRepository.findById(codeId).orElseThrow(
                ()->new IllegalStateException("Uporabnik with id "+codeId+" not found")
        );

        if(code != null && code.length()>0 && !Objects.equals(paymentCode.getCode(), code))
            paymentCode.setCode(code);
        if(slo != null && slo.length()>0 && !Objects.equals(paymentCode.getSlo(), slo))
            paymentCode.setSlo(slo);
        if(eng != null && eng.length()>0 && !Objects.equals(paymentCode.getEng(), eng))
            paymentCode.setEng(eng);
    }

    public Optional<PaymentCode> findByCode(String code) {

        return paymentRepository.findByCode(code);

    }
}