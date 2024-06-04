package com.transportsolution.transportsolution.controller;

import java.security.Principal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.transportsolution.transportsolution.model.SignUpModel;
import com.transportsolution.transportsolution.model.UserModel;
import com.transportsolution.transportsolution.service.KeycloakUserService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class KeycloakUserController {

    private final KeycloakUserService keycloakUserService;

    @PostMapping
    public SignUpModel createUser(@RequestBody SignUpModel model) {
        return keycloakUserService.createUser(model);
    }

    @GetMapping
    public UserModel getUser(Principal principal) {
        return keycloakUserService.getUserById(principal.getName());
    }

    @DeleteMapping("/{userId}")
    public void deleteUserById(@PathVariable String userId) {
        keycloakUserService.deleteUserById(userId);
    }

}
