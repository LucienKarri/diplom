package com.transportsolution.transportsolution.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.transportsolution.transportsolution.entity.VehicleEntity;
import com.transportsolution.transportsolution.model.VehicleModel;
import com.transportsolution.transportsolution.repository.VehicleRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;

    private final BrandService brandService;
    private final ModelService modelService;

    public VehicleEntity createVehicle(VehicleModel vehicle) throws Exception {
        return vehicleRepository
                .save(VehicleEntity.builder().brandEntity(brandService.getById(vehicle.getBrand()))
                        .modelEntity(modelService.getById(vehicle.getModel()))
                        .capacity(vehicle.getCapacity()).description(vehicle.getDescription())
                        .enginePower(vehicle.getEnginePower()).fuelType(vehicle.getFuelType())
                        .height(vehicle.getHeight()).length(vehicle.getLength())
                        .liftingCapacity(vehicle.getLiftingCapacity()).torque(vehicle.getTorque())
                        .transmission(vehicle.getTransmission()).width(vehicle.getWidth())
                        .year(vehicle.getYear()).build());
    }

    public VehicleEntity updateVehicle(VehicleModel vehicle) throws Exception {
        return vehicleRepository
                .save(VehicleEntity.builder().brandEntity(brandService.getById(vehicle.getBrand()))
                        .modelEntity(modelService.getById(vehicle.getModel()))
                        .capacity(vehicle.getCapacity()).description(vehicle.getDescription())
                        .enginePower(vehicle.getEnginePower()).fuelType(vehicle.getFuelType())
                        .height(vehicle.getHeight()).length(vehicle.getLength())
                        .liftingCapacity(vehicle.getLiftingCapacity()).torque(vehicle.getTorque())
                        .transmission(vehicle.getTransmission()).width(vehicle.getWidth())
                        .year(vehicle.getYear()).id(vehicle.getId()).build());
    }

    public List<VehicleEntity> getVehicleById(Integer id) {
        return vehicleRepository.findById(id).stream().toList();
    }

    public List<VehicleEntity> getVehicle() {
        return vehicleRepository.findAll();
    }

    public void deleteVehicleById(Integer id) {
        vehicleRepository.deleteById(id);
    }
}
