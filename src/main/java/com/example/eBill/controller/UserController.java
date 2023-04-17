package com.example.eBill.controller;

import com.example.eBill.model.IBAN;
import com.example.eBill.model.User;
import com.example.eBill.reqres.IBANRequest;
import com.example.eBill.reqres.UserInfoResponse;
import com.example.eBill.service.IBANService;
import com.example.eBill.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final IBANService ibanService;

    @RequestMapping("/getUserInfo")
    @ResponseBody
    private UserInfoResponse createUserInfoResponse(@RequestBody Long id) {

        UserInfoResponse userInfoResponse = new UserInfoResponse();

        Optional<User> user = userService.getUserById(id);

        userInfoResponse.setName(user.get().getName());
        userInfoResponse.setStreet(user.get().getStreet());
        userInfoResponse.setStreetNumber(user.get().getStreetNumber());
        userInfoResponse.setCity(user.get().getCity());
        userInfoResponse.setCityCode(user.get().getCityCode());
        userInfoResponse.setAccounts(user.get().getAccounts());
        return userInfoResponse;

    }
    @RequestMapping("/addIban")
    @ResponseBody
    private String addIBAN(@RequestBody @Valid IBANRequest ibanRequest) {

        System.out.println(ibanRequest);
        boolean exist = ibanService.existsByNumber(ibanRequest.getNumber());

        if (exist) {
            return "IBAN already exists";
        } else {

            Optional<User> user = userService.getUserById(ibanRequest.getId());

            IBAN newIban = new IBAN(ibanRequest.getNumber());

            ibanService.saveIBAN(newIban);

            user.get().addIBAN(newIban);

            userService.saveUser(user.get());

            return "IBAN added successfully";
        }
    }

}
