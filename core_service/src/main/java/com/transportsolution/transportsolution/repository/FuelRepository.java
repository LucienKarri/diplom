package com.transportsolution.transportsolution.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.transportsolution.transportsolution.entity.FuelEntity;

@Repository
public interface FuelRepository extends JpaRepository<FuelEntity, Long> {
    FuelEntity findByCode(String code);
}
