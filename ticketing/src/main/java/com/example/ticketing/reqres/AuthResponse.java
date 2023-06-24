package com.example.ticketing.reqres;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private Long id;
    private String username;
    private String email;
    private String role;
}