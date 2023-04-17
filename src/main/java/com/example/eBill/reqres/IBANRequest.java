package com.example.eBill.reqres;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class IBANRequest {

    @NotBlank
    private String number;

    @NotNull
    private Long id;
}
