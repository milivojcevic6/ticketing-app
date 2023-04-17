package com.example.eBill.controller;

import com.example.eBill.model.PaymentCode;
import com.example.eBill.service.PaymentCodeService;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RestController
public class PaymentController {

    private final PaymentCodeService paymentService;

    public PaymentController(PaymentCodeService paymentService) {
        this.paymentService = paymentService;
    }

    @RequestMapping(path = "/api/codes")
    public List<PaymentCode> getPaymentCodes(){
        return paymentService.getPaymentCodes();
    }

    @PostMapping(path = "/api/addCode")
    public void createPaymentCode(PaymentCode code){
        paymentService.createCode(code);
    }

    @DeleteMapping(path="/api/delete/{codeId}")
    public void deletePaymentCode(@PathVariable("codeID") Long id){
        paymentService.deleteCode(id);
    }

    @Transactional
    @PutMapping(path = "/api/update/{codeId}")
    public void updatePaymentCode(@PathVariable("codeId") Long codeId,
                                  @RequestParam(required = false) String code,
                                  @RequestParam(required = false) String slo,
                                  @RequestParam(required = false) String eng){
        paymentService.updateCode(codeId, code, slo, eng);
    }

    @PostMapping("/api/generate/getOpis")
    @ResponseBody
    public String getOpis(@RequestBody String code) {

        return paymentService.findByCode(code).get().getSlo();
    }
}