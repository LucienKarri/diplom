package com.transportsolution.transportsolution.model;

import lombok.Data;

@Data
public class VehicleModel {

    private Integer id;
    private Long brandEntity;
    private Integer modelEntity;
    private int year;
    private int liftingCapacity;
    private int length;
    private int height;
    private int width;
    private int capacity;
    private int enginePower;
    private int torque;
    private Long fuelEntity;
    private Long transmissionEntity;
    private String description;
    private String attachment;
    private int price;
}
