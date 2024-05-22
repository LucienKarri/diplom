package com.transportsolution.transportsolution.service;

import org.keycloak.representations.AccessTokenResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import com.transportsolution.transportsolution.model.RefreshTokenModel;
import com.transportsolution.transportsolution.model.SignInModel;

@Service
public class KeycloakAuthenticationServiceImpl implements KeycloakAuthenticationService {

    @Value("${base-url}")
    private String serverUrl;
    @Value("${realm}")
    private String realm;
    @Value("${client-id}")
    private String clientId;
    @Value("${client-secret}")
    private String clientSecret;
    @Value("${grant-type-password}")
    private String grantTypePassword;
    @Value("${grant-type-refresh-token}")
    private String grantTypeRefresh;

    @Override
    public AccessTokenResponse signIn(SignInModel model) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("username", model.username());
        params.add("password", model.password());
        params.add("grant_type", grantTypePassword);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> requestEntity =
                new HttpEntity<>(params, getHttpHeaders());

        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(getRequestUrl("token"), HttpMethod.POST, requestEntity,
                AccessTokenResponse.class).getBody();
    }

    @Override
    public AccessTokenResponse refreshToken(RefreshTokenModel token) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("refresh_token", token.refreshToken());
        params.add("grant_type", grantTypeRefresh);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> requestEntity =
                new HttpEntity<>(params, getHttpHeaders());

        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(getRequestUrl("token"), HttpMethod.POST, requestEntity,
                AccessTokenResponse.class).getBody();
    }

    @Override
    public void signOut(RefreshTokenModel token) {

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("refresh_token", token.refreshToken());
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> requestEntity =
                new HttpEntity<>(params, getHttpHeaders());

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForEntity(getRequestUrl("logout"), requestEntity, Object.class);
    }

    private HttpHeaders getHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        return headers;
    }

    private String getRequestUrl(String action) {
        return UriComponentsBuilder.fromHttpUrl(serverUrl).pathSegment("realms").pathSegment(realm)
                .pathSegment("protocol").pathSegment("openid-connect").pathSegment(action)
                .toUriString();
    }

}
