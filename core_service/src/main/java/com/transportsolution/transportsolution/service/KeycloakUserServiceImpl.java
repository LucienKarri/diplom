package com.transportsolution.transportsolution.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import com.transportsolution.transportsolution.model.SignUpModel;
import jakarta.ws.rs.core.Response;

@Service
public class KeycloakUserServiceImpl implements KeycloakUserService {

    @Value("${realm}")
    private String realm;

    private Keycloak keycloak;

    public KeycloakUserServiceImpl(Keycloak keycloak) {
        this.keycloak = keycloak;
    }


    @Override
    public SignUpModel createUser(SignUpModel model) {
        UserRepresentation user = new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(model.username());
        user.setFirstName(model.firstName());
        user.setLastName(model.lastName());
        user.setEmail(model.email());
        user.setEmailVerified(false);

        CredentialRepresentation credentials = new CredentialRepresentation();
        credentials.setTemporary(false);
        credentials.setType(CredentialRepresentation.PASSWORD);
        credentials.setValue(model.password());

        List<CredentialRepresentation> list = new ArrayList<>();
        list.add(credentials);
        user.setCredentials(list);

        UsersResource usersResource = getUsersResources();

        Response response = usersResource.create(user);

        if (Objects.equals((201), response.getStatus())) {
            List<UserRepresentation> representationList =
                    usersResource.searchByUsername(model.username(), true);
            if (!CollectionUtils.isEmpty(representationList)) {
                UserRepresentation userRepresentation1 =
                        representationList.stream()
                                .filter(userRepresentation -> Objects.equals(false,
                                        userRepresentation.isEmailVerified()))
                                .findFirst().orElse(null);
                sentEmailVerification(userRepresentation1.getId());
            }
            return model;
        }

        return null;
    }

    private UsersResource getUsersResources() {

        RealmResource realm1 = keycloak.realm(realm);
        return realm1.users();
    }

    @Override
    public UserRepresentation getUserById(String userId) {
        return getUsersResources().get(userId).toRepresentation();
    }

    @Override
    public void deleteUserById(String userId) {
        getUsersResources().delete(userId);
    }

    @Override
    public void sentEmailVerification(String userId) {
        UsersResource usersResource = getUsersResources();
        usersResource.get(userId).sendVerifyEmail();
    }
}
