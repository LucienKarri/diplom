package com.transportsolution.transportsolution.service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import com.transportsolution.transportsolution.entity.ApplicationEntity;
import com.transportsolution.transportsolution.model.ApplicationModel;
import com.transportsolution.transportsolution.model.ApplicationUpdateModel;
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
    private final VehicleService vehicleService;
    private final AttachmentService attachmentService;

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

    public List<ApplicationModel> getApplications(String id, String createBy) throws Exception {
        if (id != null) {
            log.info("ID: " + id);

            ApplicationEntity application = applicationRepository.findById(id)
                    .orElseThrow(() -> new Exception("Application not found - " + id));

            log.info("APPLICATION: " + application);
            ApplicationModel model = new ApplicationModel();

            model.setId(application.getId());
            model.setStatus(application.getStatus());
            model.setCreateBy(keycloakUserService.getUserById(application.getCreateBy()));
            model.setCreatedDate(application.getCreatedDate());
            model.setLastUpdatedDate(application.getLastUpdatedDate());
            model.setAdvancePayment(application.getAdvancePayment());
            model.setAmountOfCredit(application.getAmountOfCredit());
            model.setCreditTerm(application.getCreditTerm());
            model.setMonthlyPayment(application.getMonthlyPayment());
            model.setPaymentDay(application.getPaymentDay());
            model.setVehicle(application.getVehicle());
            model.setAttachment(application.getAttachment());
            model.setCompanyAdress(application.getCompanyAdress());

            return List.of(model);
        }

        if (createBy != null) {
            return applicationRepository.findByCreateBy(createBy).stream().map(application -> {
                ApplicationModel model = new ApplicationModel();

                model.setId(application.getId());
                model.setStatus(application.getStatus());
                model.setCreatedDate(application.getCreatedDate());
                model.setLastUpdatedDate(application.getLastUpdatedDate());
                model.setCreateBy(keycloakUserService.getUserById(application.getCreateBy()));
                model.setAdvancePayment(application.getAdvancePayment());
                model.setAmountOfCredit(application.getAmountOfCredit());
                model.setCreditTerm(application.getCreditTerm());
                model.setMonthlyPayment(application.getMonthlyPayment());
                model.setPaymentDay(application.getPaymentDay());
                model.setVehicle(application.getVehicle());
                model.setAttachment(application.getAttachment());
                model.setCompanyAdress(application.getCompanyAdress());

                return model;
            }).toList();
        }

        return applicationRepository.findAll().stream().map(application -> {
            ApplicationModel model = new ApplicationModel();

            model.setId(application.getId());
            model.setStatus(application.getStatus());
            model.setCreatedDate(application.getCreatedDate());
            model.setLastUpdatedDate(application.getLastUpdatedDate());
            model.setCreateBy(keycloakUserService.getUserById(application.getCreateBy()));
            model.setAdvancePayment(application.getAdvancePayment());
            model.setAmountOfCredit(application.getAmountOfCredit());
            model.setCreditTerm(application.getCreditTerm());
            model.setMonthlyPayment(application.getMonthlyPayment());
            model.setPaymentDay(application.getPaymentDay());
            model.setVehicle(application.getVehicle());
            model.setAttachment(application.getAttachment());
            model.setCompanyAdress(application.getCompanyAdress());

            return model;
        }).toList();
    }

    public ApplicationEntity updateApplication(ApplicationUpdateModel model) throws Exception {
        log.info("JOJPDASJDAD: " + model);
        ApplicationEntity entity = applicationRepository.findById(model.getId()).orElseThrow(
                () -> new Exception("Application not found with Id: " + model.getId()));

        if (model.getStatus() != null) {
            entity.setStatus(statusService.getStatusById(model.getStatus()));
        }
        if (model.getAdvancePayment() != null) {
            entity.setAdvancePayment(model.getAdvancePayment());
        }
        if (model.getAmountOfCredit() != null) {
            entity.setAmountOfCredit(model.getAmountOfCredit());
        }
        if (model.getCreditTerm() != null) {
            entity.setCreditTerm(model.getCreditTerm());
        }
        if (model.getMonthlyPayment() != null) {
            entity.setMonthlyPayment(model.getMonthlyPayment());
        }
        if (model.getPaymentDay() != null) {
            entity.setPaymentDay(model.getPaymentDay());
        }
        if (model.getVehicle() != null) {
            entity.setVehicle(vehicleService.getVehicleById(model.getVehicle()));
        }
        if (model.getCreateBy() != null) {
            entity.setCreateBy(model.getCreateBy());
        }
        if (model.getAttachment() != null) {
            entity.setAttachment(attachmentService.getAttachment(model.getAttachment()));
        }
        if (model.getCompanyAdress() != null) {
            entity.setCompanyAdress(model.getCompanyAdress());
        }

        return applicationRepository.save(entity);
    }
}
