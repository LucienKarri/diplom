package com.transportsolution.transportsolution.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.transportsolution.transportsolution.entity.StatusEntity;
import com.transportsolution.transportsolution.repository.StatusRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StatusService {

    private final StatusRepository statusRepository;

    public List<StatusEntity> getAllStatuses() {
        return statusRepository.findAll();
    }

    public StatusEntity getStatusById(Long Id) throws Exception {
        return statusRepository.findById(Id)
                .orElseThrow(() -> new Exception("Status not found - " + Id));
    }
}
