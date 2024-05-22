package com.transportsolution.transportsolution.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.transportsolution.transportsolution.entity.ModelEntity;
import com.transportsolution.transportsolution.service.ModelService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class ModelController {
    private final ModelService modelService;

    // @GetMapping("/dictionaries/models")
    // public ResponseEntity<List<ModelEntity>> getAll() {
    // return new ResponseEntity<>(modelService.getAll(), HttpStatus.OK);
    // }

    @GetMapping("/dictionaries/models")
    public ResponseEntity<List<ModelEntity>> getByBrandId(@RequestParam Integer id) {
        return new ResponseEntity<>(modelService.getByBrandId(id), HttpStatus.OK);
    }
}
