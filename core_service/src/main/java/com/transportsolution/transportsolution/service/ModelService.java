package com.transportsolution.transportsolution.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.transportsolution.transportsolution.entity.ModelEntity;
import com.transportsolution.transportsolution.model.ModelModel;
import com.transportsolution.transportsolution.repository.ModelRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ModelService {

    private final ModelRepository modelRepository;
    private final BrandService brandService;

    public ModelEntity create(ModelModel model) throws Exception {
        return modelRepository.save(ModelEntity.builder().name(model.getName())
                .brand(brandService.getById(model.getBrandId())).build());
    }


    public List<ModelEntity> getByBrandId(Integer id) {
        return modelRepository.findByBrandId(id);
    }

    public List<ModelEntity> getAll() {
        return modelRepository.findAll();
    }

    public ModelEntity getById(Integer id) throws Exception {
        return modelRepository.findById(id)
                .orElseThrow(() -> new Exception("Model not found - " + id));
    }
}
