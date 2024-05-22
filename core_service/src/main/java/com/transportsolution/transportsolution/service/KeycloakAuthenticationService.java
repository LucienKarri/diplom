package com.transportsolution.transportsolution.service;

import org.keycloak.representations.AccessTokenResponse;
import com.transportsolution.transportsolution.model.RefreshTokenModel;
import com.transportsolution.transportsolution.model.SignInModel;

public interface KeycloakAuthenticationService {
    AccessTokenResponse signIn(SignInModel model);

    AccessTokenResponse refreshToken(RefreshTokenModel token);

    void signOut(RefreshTokenModel token);
}
