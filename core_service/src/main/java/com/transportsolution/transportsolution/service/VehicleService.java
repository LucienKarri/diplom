package com.transportsolution.transportsolution.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.transportsolution.transportsolution.entity.VehicleEntity;
import com.transportsolution.transportsolution.model.VehicleModel;
import com.transportsolution.transportsolution.repository.VehicleRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Service
@Slf4j
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;

    private final BrandService brandService;
    private final ModelService modelService;
    private final FuelService fuelService;
    private final TransmissionService transmissionService;
    private final AttachmentService attachmentService;

    public VehicleEntity createVehicle(VehicleModel vehicle) throws Exception {
        log.info("HUIPIZDA: " + vehicle);
        VehicleEntity entity = new VehicleEntity();
        entity.setBrandEntity(brandService.getById(vehicle.getBrandEntity()));
        entity.setModelEntity(modelService.getById(vehicle.getModelEntity()));
        entity.setLiftingCapacity(vehicle.getLiftingCapacity());
        entity.setCapacity(vehicle.getCapacity());
        entity.setEnginePower(vehicle.getEnginePower());
        entity.setTorque(vehicle.getTorque());
        entity.setHeight(vehicle.getHeight());
        entity.setLength(vehicle.getLength());
        entity.setWidth(vehicle.getWidth());
        entity.setYear(vehicle.getYear());
        entity.setFuelEntity(fuelService.getById(vehicle.getFuelEntity()));
        entity.setTransmissionEntity(transmissionService.getById(vehicle.getTransmissionEntity()));
        entity.setPrice(vehicle.getPrice());

        if (vehicle.getDescription() != null) {
            entity.setDescription(vehicle.getDescription());
        }
        if (vehicle.getAttachment() != null) {
            entity.setAttachment(attachmentService.getAttachment(vehicle.getAttachment()));
        }
        if (vehicle.getId() != null) {
            entity.setId(vehicle.getId());
        }
        return vehicleRepository.save(entity);
    }

    // public VehicleEntity updateVehicle(VehicleModel vehicle) throws Exception {
    // VehicleEntity entity = new VehicleEntity();

    // return vehicleRepository
    // .save(VehicleEntity.builder().brandEntity(brandService.getById(vehicle.getBrand()))
    // .modelEntity(modelService.getById(vehicle.getModel()))
    // .capacity(vehicle.getCapacity()).description(vehicle.getDescription())
    // .enginePower(vehicle.getEnginePower())
    // .fuelEntity(fuelService.getById(vehicle.getFuel()))
    // .height(vehicle.getHeight()).length(vehicle.getLength())
    // .liftingCapacity(vehicle.getLiftingCapacity()).torque(vehicle.getTorque())
    // .transmissionEntity(transmissionService.getById(vehicle.getTransmission()))
    // .year(vehicle.getYear()).id(vehicle.getId()).build());
    // }

    public VehicleEntity getVehicleById(Integer id) throws Exception {
        return vehicleRepository.findById(id).orElseThrow(() -> new Exception("JOPPPPPAAAA"));
    }

    public List<VehicleEntity> getVehicle() {
        return vehicleRepository.findAll();
    }

    public void deleteVehicleById(Integer id) {
        vehicleRepository.deleteById(id);
    }

}
