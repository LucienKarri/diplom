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


    @GetMapping
    public List<VehicleEntity> getVehicle(
            @RequestParam(value = "id", required = false) Integer id) {
        if (id != null) {
            return vehicleService.getVehicleById(id);
        } else {
            return vehicleService.getVehicle();
        }
    }

    @PutMapping
    public VehicleEntity updateVehicle(@RequestBody VehicleModel vehicle) throws Exception {
        return vehicleService.updateVehicle(vehicle);
    }

    @DeleteMapping
    public void deleteVehicleById(@RequestParam Integer id) {
        vehicleService.deleteVehicleById(id);
    }

}
