package com.example.eBill.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username")})
public class User {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;
    private String name;
    private String username;
    private String password;
    private String street;
    private String streetNumber;
    private String cityCode;
    private String city;
    private String role;
    private String email;

    @OneToMany
    private Set<IBAN> accounts = new HashSet<>();

    public User() {
    }

    public User(String name, String username, String password, String street, String streetNumber, String cityCode, String city, String role, String email) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.street = street;
        this.streetNumber = streetNumber;
        this.cityCode = cityCode;
        this.city = city;
        this.role = role;
        this.email = email;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void addIBAN(IBAN iban) {
        this.accounts.add(iban);
    }

    public ArrayList<IBAN> getAccounts() {

        ArrayList<IBAN> arr = new ArrayList<>();
        arr.addAll(accounts);
        return arr;
    }

    public void setAccounts(Set<IBAN> accounts) {
        this.accounts = accounts;
    }
}
