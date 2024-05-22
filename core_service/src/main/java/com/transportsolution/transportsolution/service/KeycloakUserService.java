package com.transportsolution.transportsolution.service;

import org.keycloak.representations.idm.UserRepresentation;
import com.transportsolution.transportsolution.model.SignUpModel;


public interface KeycloakUserService {
    SignUpModel createUser(SignUpModel model);

    UserRepresentation getUserById(String userId);

    void deleteUserById(String userId);

    void sentEmailVerification(String userId);
}
