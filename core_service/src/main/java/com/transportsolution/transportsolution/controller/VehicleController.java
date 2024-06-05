package com.transportsolution.transportsolution.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.transportsolution.transportsolution.entity.VehicleEntity;
import com.transportsolution.transportsolution.model.VehicleModel;
import com.transportsolution.transportsolution.repository.SearchRequest;
import com.transportsolution.transportsolution.service.VehicleService;


@RestController
@RequestMapping("/api/vehicle")
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;

    @PostMapping
    public VehicleEntity createVehicle(@RequestBody VehicleModel vehicle) throws Exception {
        return vehicleService.createVehicle(vehicle);
    }


    // @GetMapping
    // public List<VehicleEntity> getVehicle(@RequestParam(value = "id", required = false) Integer
    // id,
    // @RequestParam(value = "brandId", required = false) Integer brandId) throws Exception {
    // if (id != null) {
    // return List.of(vehicleService.getVehicleById(id));
    // }

    // if (brandId != null) {
    // return vehicleService.getByBrandId(brandId);
    // }
    // return vehicleService.getVehicle();
    // }
    @GetMapping
    public List<VehicleEntity> getVehicle(SearchRequest request) throws Exception {
        if (request == null) {
            return vehicleService.getVehicle();
        }
        return vehicleService.getByBrandId(request);
    }

    @PutMapping
    public VehicleEntity updateVehicle(@RequestBody VehicleModel vehicle) throws Exception {
        return vehicleService.createVehicle(vehicle);
    }

    @DeleteMapping
    public void deleteVehicleById(@RequestParam Integer id) {
        vehicleService.deleteVehicleById(id);
    }

}
