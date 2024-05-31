package com.transportsolution.transportsolution.controller;

import java.security.Principal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.transportsolution.transportsolution.entity.ApplicationEntity;
import com.transportsolution.transportsolution.model.SignUpModel;
import com.transportsolution.transportsolution.service.ApplicationService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/application")
    public ApplicationEntity createApplication(@RequestBody SignUpModel userData,
            Principal principal) throws Exception {
        return applicationService.createRequest(userData, principal);
    }
}
