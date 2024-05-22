// package com.transportsolution.transportsolution.config;

// import java.util.Arrays;
// import java.util.List;
// import java.util.stream.Stream;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.Customizer;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
// import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
// import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
// import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
// import org.springframework.security.oauth2.core.oidc.user.OidcUser;
// import
// org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
// import
// org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import jakarta.ws.rs.HttpMethod;

// @Configuration
// public class SecurityConfig {

// @Bean
// public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
// http.oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));
// http.oauth2Login(Customizer.withDefaults());

// return http.cors(Customizer.withDefaults()).csrf(csrf -> csrf.disable())
// .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
// // .requestMatchers(HttpMethod.POST, "/sign-in")
// // .permitAll()
// // .requestMatchers(HttpMethod.POST, "/sign-out")
// // .hasRole("USER")
// // .requestMatchers(HttpMethod.POST, "/refresh")
// // .permitAll()
// // .requestMatchers(HttpMethod.POST, "/users")
// // .permitAll().requestMatchers("/api/vehicle")
// // .permitAll().anyRequest().authenticated())
// .sessionManagement(session -> session.sessionCreationPolicy(
// SessionCreationPolicy.STATELESS))
// .build();
// }

// @Bean
// public JwtAuthenticationConverter jwtAuthenticationConverter() {
// JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter =
// new JwtGrantedAuthoritiesConverter();
// JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
// converter.setPrincipalClaimName("preferred_username");
// converter.setJwtGrantedAuthoritiesConverter(jwt -> {
// var authorities = grantedAuthoritiesConverter.convert(jwt);
// var roles = (List<String>) jwt.getClaimAsMap("realm_access").get("roles");

// return Stream.concat(authorities.stream(),
// roles.stream().filter(role -> role.startsWith("ROLE_"))
// .map(SimpleGrantedAuthority::new)
// .map(GrantedAuthority.class::cast))
// .toList();
// });
// return converter;
// }

// @Bean
// public OAuth2UserService<OidcUserRequest, OidcUser> oAuth2UserService() {
// var oidcUserService = new OidcUserService();

// return userRequest -> {
// var oidcUser = oidcUserService.loadUser(userRequest);
// var roles = (List<String>) oidcUser.getClaimAsMap("realm_access")
// .get("roles");
// var authorities = Stream.concat(oidcUser.getAuthorities().stream(),
// roles.stream().filter(role -> role.startsWith("ROLE_"))
// .map(SimpleGrantedAuthority::new)
// .map(GrantedAuthority.class::cast))
// .toList();
// return new DefaultOidcUser(authorities, oidcUser.getIdToken(),
// oidcUser.getUserInfo());
// };
// }

// @Bean
// CorsConfigurationSource corsConfigurationSource() {
// CorsConfiguration configuration = new CorsConfiguration();
// configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
// configuration.setAllowedMethods(Arrays.asList("*"));
// configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
// configuration.setAllowCredentials(true);
// UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
// source.registerCorsConfiguration("/**", configuration);
// return source;
// }
// }

package com.transportsolution.transportsolution.config;

import lombok.RequiredArgsConstructor;
import java.util.Arrays;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@Configuration
public class WebSecurityConfig {

        public static final String ADMIN = "admin";
        public static final String GENERAL = "general";
        private final JwtAuthConverter jwtAuthConverter;


        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {


                return httpSecurity.cors(Customizer.withDefaults()).csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt
                                                .jwtAuthenticationConverter(jwtAuthConverter)))
                                .sessionManagement(sess -> sess.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS))
                                .build();
        }

        @Bean
        CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
                configuration.setAllowedMethods(Arrays.asList("*"));
                configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
                configuration.setAllowCredentials(true);
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }


}

