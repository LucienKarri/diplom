package com.transportsolution.transportsolution.model;

import lombok.Data;

@Data
public class UserModel {
    private String id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String companyName;

}
