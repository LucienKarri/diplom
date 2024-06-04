package com.transportsolution.transportsolution.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private BrandEntity brandEntity;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private ModelEntity modelEntity;

    @ManyToOne
    @JoinColumn(name = "fuel_id")
    private FuelEntity fuelEntity;

    @ManyToOne
    @JoinColumn(name = "transmission_id")
    private TransmissionEntity transmissionEntity;

    @ManyToOne(optional = true)
    @JoinColumn(name = "attachment_id", nullable = true)
    private AttachmentEntity attachment;

    private int year;
    private int liftingCapacity;
    private int length;
    private int height;
    private int width;
    private int capacity;
    private int enginePower;
    private int torque;
    private int price;

    @Column(nullable = true)
    private String description;
}
