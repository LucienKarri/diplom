package com.transportsolution.transportsolution.controller;


import org.keycloak.representations.AccessTokenResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.transportsolution.transportsolution.model.RefreshTokenModel;
import com.transportsolution.transportsolution.model.SignInModel;
import com.transportsolution.transportsolution.service.KeycloakAuthenticationService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class KeycloakAuthenticationController {
    private final KeycloakAuthenticationService keycloakAuthenticationService;

    @PostMapping("/sign-in")
    public AccessTokenResponse signIn(@RequestBody SignInModel model) {
        return keycloakAuthenticationService.signIn(model);
    }

    @PostMapping("/sign-out")
    public void signOut(@RequestBody RefreshTokenModel refreshToken) {
        keycloakAuthenticationService.signOut(refreshToken);
    }

    @PostMapping("/refresh")
    public AccessTokenResponse refresh(@RequestBody RefreshTokenModel refreshToken) {
        return keycloakAuthenticationService.refreshToken(refreshToken);
    }
}
