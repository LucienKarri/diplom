package com.transportsolution.transportsolution.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.transportsolution.transportsolution.entity.TransmissionEntity;

@Repository
public interface TransmissionRepository extends JpaRepository<TransmissionEntity, Long> {

    TransmissionEntity findByCode(String code);
}
