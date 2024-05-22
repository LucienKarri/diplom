package com.transportsolution.transportsolution.model;

import lombok.Data;

@Data
public class VehicleModel {

    private Integer id;
    private Long brand;
    private Integer model;
    private int year;
    private int liftingCapacity;
    private int length;
    private int height;
    private int width;
    private int capacity;
    private int enginePower;
    private int torque;
    private String fuelType;
    private String transmission;
    private String description;
}
