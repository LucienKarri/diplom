package com.transportsolution.transportsolution.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import com.transportsolution.transportsolution.model.UserModel;
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

        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("middleName", List.of(model.middleName()));
        attributes.put("companyName", List.of(model.companyName()));
        attributes.put("phoneNumber", List.of(model.phoneNumber()));

        user.setAttributes(attributes);

        UsersResource usersResource = getUsersResources();

        Response response = usersResource.create(user);

        if (Objects.equals((201), response.getStatus())) {
            List<UserRepresentation> representationList =
                    usersResource.searchByEmail(model.email(), true);
            if (!CollectionUtils.isEmpty(representationList)) {
                UserRepresentation userRepresentation1 =
                        representationList.stream()
                                .filter(userRepresentation -> Objects.equals(false,
                                        userRepresentation.isEmailVerified()))
                                .findFirst().orElse(null);
                sentEmailVerification(userRepresentation1.getId());
            }
            return model;
        } else {
            String responseBody = response.readEntity(String.class);
            System.out.println("User creation response body: " + responseBody);
            throw new RuntimeException("Failed to create user");
        }
    }

    private UsersResource getUsersResources() {

        RealmResource realm1 = keycloak.realm(realm);
        return realm1.users();
    }

    @Override
    public UserModel getUserById(String userId) {
        UserRepresentation user = getUsersResources().get(userId).toRepresentation();
        UserModel model = new UserModel();

        model.setId(user.getId());
        model.setEmail(user.getEmail());
        model.setFirstName(user.getFirstName());
        model.setMiddleName(user.getAttributes().get("middleName").get(0));
        model.setLastName(user.getLastName());
        model.setCompanyName(user.getAttributes().get("companyName").get(0));
        model.setPhoneNumber(user.getAttributes().get("phoneNumber").get(0));


        return model;
    }

    @Override
    public UserModel getUserByEmail(String email) {
        UserRepresentation user = getUsersResources().searchByEmail(email, true).get(0);
        UserModel model = new UserModel();

        model.setId(user.getId());
        model.setEmail(user.getEmail());
        model.setFirstName(user.getFirstName());
        model.setMiddleName(user.getAttributes().get("middleName").get(0));
        model.setLastName(user.getLastName());
        model.setCompanyName(user.getAttributes().get("companyName").get(0));
        model.setPhoneNumber(user.getAttributes().get("phoneNumber").get(0));

        return model;
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
