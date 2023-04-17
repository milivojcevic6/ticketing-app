package com.example.eBill.model;

import javax.persistence.*;

@Entity
@Table(name = "iban")
public class IBAN {
    @Id
    @SequenceGenerator(
            name = "iban_sequence",
            sequenceName = "iban_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "iban_sequence"
    )
    private Long id;
    private String number;

    public IBAN(String number) {
        this.number = number;
    }

    public IBAN() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}