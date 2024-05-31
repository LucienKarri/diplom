package com.transportsolution.transportsolution.service;

import java.security.Principal;
import java.time.LocalDateTime;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;
import com.transportsolution.transportsolution.entity.ApplicationEntity;
import com.transportsolution.transportsolution.model.SignUpModel;
import com.transportsolution.transportsolution.model.UserModel;
import com.transportsolution.transportsolution.repository.ApplicationRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@AllArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final KeycloakUserService keycloakUserService;
    private final StatusService statusService;

    public ApplicationEntity createRequest(SignUpModel userData, Principal principal)
            throws Exception {
        if (principal != null) {
            UserModel currentUser = keycloakUserService.getUserById(principal.getName());

            if (currentUser != null) {
                ApplicationEntity entity = ApplicationEntity.builder().createBy(currentUser.getId())
                        .status(statusService.getStatusById((long) 3))
                        .createdDate(LocalDateTime.now()).lastUpdatedDate(LocalDateTime.now())
                        .build();

                return applicationRepository.save(entity);
            }
        }

        try {
            keycloakUserService.createUser(userData);
            log.info("DANET");
            ApplicationEntity entity = ApplicationEntity.builder()
                    .createBy(keycloakUserService.getUserByEmail(userData.email()).getId())
                    .status(statusService.getStatusById((long) 3)).createdDate(LocalDateTime.now())
                    .lastUpdatedDate(LocalDateTime.now()).build();

            return applicationRepository.save(entity);
        } catch (Exception e) {
            log.info("JOPAHUI: " + e.getMessage());
            throw e;
        }
    }
}
