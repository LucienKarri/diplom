package com.transportsolution.transportsolution.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.transportsolution.transportsolution.entity.BrandEntity;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, Long> {

}
