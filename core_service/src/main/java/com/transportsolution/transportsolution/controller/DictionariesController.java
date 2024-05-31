package com.transportsolution.transportsolution.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.transportsolution.transportsolution.entity.BrandEntity;
import com.transportsolution.transportsolution.entity.FuelEntity;
import com.transportsolution.transportsolution.entity.StatusEntity;
import com.transportsolution.transportsolution.entity.TransmissionEntity;
import com.transportsolution.transportsolution.model.ModelModel;
import com.transportsolution.transportsolution.repository.StatusRepository;
import com.transportsolution.transportsolution.service.BrandService;
import com.transportsolution.transportsolution.service.FuelService;
import com.transportsolution.transportsolution.service.ModelService;
import com.transportsolution.transportsolution.service.TransmissionService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/dictionaries")
@AllArgsConstructor
public class DictionariesController {
    private final BrandService brandService;
    private final ModelService modelService;
    private final TransmissionService transmissionService;
    private final FuelService fuelService;
    private final StatusRepository statusRepository;

    @GetMapping("/brands")
    public ResponseEntity<List<BrandEntity>> getAllBrands() {
        return new ResponseEntity<>(brandService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/models")
    public ResponseEntity<List<ModelModel>> getModelsByBrandId(@RequestParam Integer id) {
        return new ResponseEntity<>(modelService.getByBrandId(id), HttpStatus.OK);
    }

    @GetMapping("/transmissions")
    public ResponseEntity<List<TransmissionEntity>> getAllTransmissions() {
        return new ResponseEntity<>(transmissionService.getAllTransmissions(), HttpStatus.OK);
    }

    @GetMapping("/fuel")
    public ResponseEntity<List<FuelEntity>> getAllFuel() {
        return new ResponseEntity<>(fuelService.getAllFuel(), HttpStatus.OK);
    }

    @GetMapping("/statuses")
    public ResponseEntity<List<StatusEntity>> getAllStatuses() {
        return new ResponseEntity<>(statusRepository.findAll(), HttpStatus.OK);
    }

}
