package com.transportsolution.transportsolution.controller;

import java.security.Principal;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.transportsolution.transportsolution.entity.ApplicationEntity;
import com.transportsolution.transportsolution.model.ApplicationModel;
import com.transportsolution.transportsolution.model.ApplicationUpdateModel;
import com.transportsolution.transportsolution.model.SignUpModel;
import com.transportsolution.transportsolution.service.ApplicationService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/application")
@AllArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    public ApplicationEntity createApplication(@RequestBody SignUpModel userData,
            Principal principal) throws Exception {
        return applicationService.createRequest(userData, principal);
    }

    @GetMapping
    public List<ApplicationModel> getApplications(@RequestParam(required = false) String id)
            throws Exception {
        return applicationService.getApplications(id);
    }

    @PatchMapping
    public ApplicationEntity updateApplication(@RequestBody ApplicationUpdateModel model)
            throws Exception {
        return applicationService.updateApplication(model);
    }
}
