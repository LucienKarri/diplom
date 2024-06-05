package com.transportsolution.transportsolution.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;
import com.transportsolution.transportsolution.entity.VehicleEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class VehicleSearch {
    private final EntityManager entityManager;

    public List<VehicleEntity> findByFilter(Integer id) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        CriteriaQuery<VehicleEntity> criteriaQuery =
                criteriaBuilder.createQuery(VehicleEntity.class);

        // select * from VehicleEntity
        Root<VehicleEntity> root = criteriaQuery.from(VehicleEntity.class);

        // WHERE brand_id eq id
        Predicate brandPredicate = criteriaBuilder.equal(root.get("brand").get("id"), id);

        criteriaQuery.where(brandPredicate);
        TypedQuery<VehicleEntity> query = entityManager.createQuery(criteriaQuery);

        return query.getResultList();
    }

    public List<VehicleEntity> findByDynamicFilter(SearchRequest searchRequest) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<VehicleEntity> criteriaQuery =
                criteriaBuilder.createQuery(VehicleEntity.class);
        List<Predicate> predicates = new ArrayList<>();

        // select from vehicle
        Root<VehicleEntity> root = criteriaQuery.from(VehicleEntity.class);
        if (searchRequest.getBrandId() != null) {
            Predicate brandIdPredicate =
                    criteriaBuilder.equal(root.get("brand").get("id"), searchRequest.getBrandId());
            predicates.add(brandIdPredicate);
        }

        if (searchRequest.getMinPrice() != null) {
            Predicate minPricePredicate =
                    criteriaBuilder.ge(root.get("price"), searchRequest.getMinPrice());
            predicates.add(minPricePredicate);
        }
        if (searchRequest.getMaxPrice() != null) {
            Predicate maxPricePredicate =
                    criteriaBuilder.le(root.get("price"), searchRequest.getMaxPrice());
            predicates.add(maxPricePredicate);
        }

        if (searchRequest.getFuel() != null) {
            Predicate fuelPredicate =
                    criteriaBuilder.equal(root.get("fuel").get("id"), searchRequest.getFuel());
            predicates.add(fuelPredicate);
        }
        if (searchRequest.getTransmission() != null) {
            Predicate transmissionPredicate = criteriaBuilder
                    .equal(root.get("transmission").get("id"), searchRequest.getTransmission());
            predicates.add(transmissionPredicate);
        }

        criteriaQuery.where(criteriaBuilder.and(predicates.toArray(new Predicate[0])));

        TypedQuery<VehicleEntity> query = entityManager.createQuery(criteriaQuery);
        return query.getResultList();
    }
}
