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
}
