package com.transportsolution.transportsolution.model;

import lombok.Data;

@Data
public class ApplicationUpdateModel {
    private String id;

    private Long status;
    private String createBy;

    private Integer vehicle;
    private Integer amountOfCredit;
    private Integer creditTerm;
    private Integer paymentDay;
    private Integer advancePayment;
    private Integer monthlyPayment;
    private String attachment;
    private String companyAdress;

}
