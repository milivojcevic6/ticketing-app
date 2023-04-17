package com.example.eBill.reqres;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data

public class UPNRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String iban;

    @NotBlank
    private String address;

    @NotBlank
    private String city;

    @NotBlank
    private String paymentCode;

    @NotBlank
    private String description;

    @NotNull
    private int amount;

    @NotBlank
    private String deadline;

    private String reference;
}
