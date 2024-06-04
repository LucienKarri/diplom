package com.transportsolution.transportsolution.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.transportsolution.transportsolution.entity.FuelEntity;
import com.transportsolution.transportsolution.repository.FuelRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FuelService {

    private final FuelRepository fuelRepository;

    public List<FuelEntity> getAllFuel() {
        return fuelRepository.findAll();
    }

    public FuelEntity getById(Long id) throws Exception {
        return fuelRepository.findById(id)
                .orElseThrow(() -> new Exception("Fuel not found - " + id));
    }

    public FuelEntity getByType(String code) {
        return fuelRepository.findByCode(code);
    }
}
