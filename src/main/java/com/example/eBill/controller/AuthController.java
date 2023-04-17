package com.example.eBill.controller;

import com.example.eBill.exception.DuplicatedUserInfoException;
import com.example.eBill.model.IBAN;
import com.example.eBill.model.User;
import com.example.eBill.reqres.AuthResponse;
import com.example.eBill.reqres.LoginRequest;
import com.example.eBill.reqres.SignUpRequest;
import com.example.eBill.security.CustomUserDetails;
import com.example.eBill.security.CustomUserDetailsService;
import com.example.eBill.security.WebSecurityConfig;
import com.example.eBill.service.IBANService;
import com.example.eBill.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final IBANService ibanService;

    private final CustomUserDetailsService currentUser;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userService.validUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            CustomUserDetails userDetails = new CustomUserDetails(user);
            currentUser.loadUserByUsername(userDetails.getUsername());
            return ResponseEntity.ok(new AuthResponse(user.getId(), user.getName(), user.getRole()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public AuthResponse signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userService.hasUserWithUsername(signUpRequest.getUsername())) {
            throw new DuplicatedUserInfoException(String.format("Username %s is already been used", signUpRequest.getUsername()));
        }

        User user = userService.saveUser(createUser(signUpRequest));
        return new AuthResponse(user.getId(), user.getName(), user.getRole());
    }

    private User createUser(SignUpRequest signUpRequest) {
        User user = new User();
        IBAN iban = new IBAN(signUpRequest.getIban().replaceAll(" ",""));
        ibanService.saveIBAN(iban);
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(signUpRequest.getPassword());
        user.setName(signUpRequest.getName());
        user.setCity(signUpRequest.getCity());
        user.setCityCode(signUpRequest.getCityCode());
        user.setStreet(signUpRequest.getStreet());
        user.setStreetNumber(signUpRequest.getStreetNumber());
        user.setRole(WebSecurityConfig.USER);
        user.setEmail(signUpRequest.getEmail());
        user.addIBAN(iban);
        return user;
    }

}