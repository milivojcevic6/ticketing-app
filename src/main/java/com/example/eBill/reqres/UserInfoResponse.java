package com.example.eBill.reqres;

import com.example.eBill.model.IBAN;
import lombok.Data;

import java.util.ArrayList;

@Data
public class UserInfoResponse {

    private String name;
    private String street;
    private String streetNumber;
    private String city;
    private String cityCode;
    private ArrayList<IBAN> accounts;

}
