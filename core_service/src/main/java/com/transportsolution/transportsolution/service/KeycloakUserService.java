package com.transportsolution.transportsolution.service;

import com.transportsolution.transportsolution.model.SignUpModel;
import com.transportsolution.transportsolution.model.UserModel;


public interface KeycloakUserService {
    SignUpModel createUser(SignUpModel model);

    UserModel getUserById(String userId);

    UserModel getUserByEmail(String email);

    void deleteUserById(String userId);

    void sentEmailVerification(String userId);
}
