package com.example.eBill.model;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "uplatnica")
public class Uplatnica {

    @Id
    @SequenceGenerator(
            name = "upl_seq",
            sequenceName = "upl_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "upl_seq"
    )

    private Long id;
    private String name;
    private String iban;
    private String address;

    private String city;
    private String reference;
    private int amount;
    private String description;
    private String paymentCode;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadline;

    private String uniCode;

    public Uplatnica() {
    }

    public Uplatnica(String name, String iban, String address, String city, String reference, int amount, String description, String paymentCode, LocalDate deadline) {
        this.name = name;
        this.iban = iban;
        this.address = address;
        this.city = city;
        this.reference = reference;
        this.amount = amount;
        this.description = description;
        this.paymentCode = paymentCode;
        this.deadline = deadline;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPaymentCode() {
        return paymentCode;
    }

    public void setPaymentCode(String paymentCode) {
        this.paymentCode = paymentCode;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String getUniCode() {
        return uniCode;
    }

    public void setUniCode(String uniCode) {
        this.uniCode = uniCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public String toString() {

        String string = "UPNQR\n\n\n\n\n\n\n\n" + amount + "\n\n\n";

        string += paymentCode + "\n"
                + description + "\n"
                + deadline.format(DateTimeFormatter.ofPattern("dd.MM.yyyy")) + "\n"
                + iban + "\n"
                + reference + "\n"
                + name + "\n"
                + address + "\n"
                + city + "\n";

        int len = string.length();
        if (len < 100)
            string += "0" + len + "\n";
        else string += len + "\n";

        return string;
    }
}
