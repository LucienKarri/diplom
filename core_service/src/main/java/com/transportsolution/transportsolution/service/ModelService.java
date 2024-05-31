package com.transportsolution.transportsolution.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.transportsolution.transportsolution.entity.ModelEntity;
import com.transportsolution.transportsolution.model.ModelModel;
import com.transportsolution.transportsolution.repository.ModelRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ModelService {

    private final ModelRepository modelRepository;

    public List<ModelModel> getByBrandId(Integer id) {
        return modelRepository.findByBrandId(id).stream().map(ModelModel::toModel)
                .collect(Collectors.toList());
    }

    public ModelEntity getById(Integer id) throws Exception {
        return modelRepository.findById(id)
                .orElseThrow(() -> new Exception("Model not found - " + id));
    }
}
