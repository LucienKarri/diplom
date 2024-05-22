package com.transportsolution.transportsolution.config;

import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Beans {
    @Value("${admin-cli}")
    private String adminCli;
    @Value("${admin-secret}")
    private String adminCliSecret;
    @Value("${realm}")
    private String realm;
    @Value("${base-url}")
    private String serverUrl;


    @Bean
    public Keycloak keycloak() {
        return KeycloakBuilder.builder().serverUrl(serverUrl).realm(realm)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS).clientId(adminCli)
                .clientSecret(adminCliSecret).build();
    }
}
