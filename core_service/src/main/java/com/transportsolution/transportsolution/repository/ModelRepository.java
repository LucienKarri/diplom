package com.transportsolution.transportsolution.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.transportsolution.transportsolution.entity.ModelEntity;

@Repository
public interface ModelRepository extends JpaRepository<ModelEntity, Integer> {
    List<ModelEntity> findByBrandId(Integer id);
}
