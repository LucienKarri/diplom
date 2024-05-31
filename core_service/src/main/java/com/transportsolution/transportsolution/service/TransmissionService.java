package com.transportsolution.transportsolution.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.transportsolution.transportsolution.entity.TransmissionEntity;
import com.transportsolution.transportsolution.repository.TransmissionRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TransmissionService {

    private final TransmissionRepository transmissionRepository;

    public List<TransmissionEntity> getAllTransmissions() {
        return transmissionRepository.findAll();
    }
}
