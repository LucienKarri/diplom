package com.transportsolution.transportsolution.model;

import com.transportsolution.transportsolution.entity.ModelEntity;
import lombok.Data;

@Data
public class ModelModel {
    private Integer id;
    private String name;

    public static ModelModel toModel(ModelEntity modelEntity) {
        ModelModel model = new ModelModel();
        model.setId(modelEntity.getId());
        model.setName(modelEntity.getName());

        return model;
    }
}
