package com.example.eBill.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "payment_code")
public class PaymentCode {
    @Id
    @SequenceGenerator(
            name = "code_sequence",
            sequenceName = "code_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "code_sequence"
    )
    private Long id;
    private String code;
    private String slo;
    private String eng;

    public PaymentCode(String code, String slo, String eng) {

        this.code = code;
        this.slo = slo;
        this.eng = eng;
    }

    public PaymentCode() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getSlo() {
        return slo;
    }

    public void setSlo(String slo) {
        this.slo = slo;
    }

    public String getEng() {
        return eng;
    }

    public void setEng(String eng) {
        this.eng = eng;
    }

    @Override
    public String toString() {
        return "PaymentCode{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", slo='" + slo + '\'' +
                ", eng='" + eng + '\'' +
                '}';
    }
}