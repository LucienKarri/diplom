package com.transportsolution.transportsolution.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.transportsolution.transportsolution.entity.BrandEntity;
import com.transportsolution.transportsolution.repository.BrandRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;

    public List<BrandEntity> getAll() {
        return brandRepository.findAll();
    }

    public BrandEntity getById(Long id) throws Exception {
        return brandRepository.findById(id)
                .orElseThrow(() -> new Exception("Brand not found - " + id));
    }
}
