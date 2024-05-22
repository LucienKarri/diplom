package com.transportsolution.transportsolution.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.transportsolution.transportsolution.entity.BrandEntity;
import com.transportsolution.transportsolution.service.BrandService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class BrandController {

    private final BrandService brandService;

    @GetMapping("/dictionaries/brands")
    public ResponseEntity<List<BrandEntity>> getAll() {
        return new ResponseEntity<>(brandService.getAll(), HttpStatus.OK);
    }
}
