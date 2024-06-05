package com.transportsolution.transportsolution.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.transportsolution.transportsolution.entity.VehicleEntity;
import com.transportsolution.transportsolution.model.ModelModel;
import com.transportsolution.transportsolution.model.VehicleModel;
import com.transportsolution.transportsolution.repository.SearchRequest;
import com.transportsolution.transportsolution.repository.VehicleRepository;
import com.transportsolution.transportsolution.repository.VehicleSearch;
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

    private final VehicleSearch vehicleSearch;

    public VehicleEntity createVehicle(VehicleModel vehicle) throws Exception {
        log.info("HUIPIZDA: " + vehicle);
        VehicleEntity entity = new VehicleEntity();
        entity.setBrand(brandService.getById(vehicle.getBrand()));
        entity.setModel(modelService.getById(vehicle.getModel()));
        entity.setLiftingCapacity(vehicle.getLiftingCapacity());
        entity.setCapacity(vehicle.getCapacity());
        entity.setEnginePower(vehicle.getEnginePower());
        entity.setTorque(vehicle.getTorque());
        entity.setHeight(vehicle.getHeight());
        entity.setLength(vehicle.getLength());
        entity.setWidth(vehicle.getWidth());
        entity.setYear(vehicle.getYear());
        entity.setFuel(fuelService.getById(vehicle.getFuel()));
        entity.setTransmission(transmissionService.getById(vehicle.getTransmission()));
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

    public List<VehicleEntity> getByBrandId(SearchRequest request) {
        return vehicleSearch.findByDynamicFilter(request);
        // return vehicleRepository.findByBrandId(id);
    }

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
