package com.transportsolution.transportsolution.model;

import lombok.Data;

@Data
public class PdfModel {
    private UserModel createBy;
    private Integer vehicle;
    private Integer amountOfCredit;
    private Integer creditTerm;
    private Integer paymentDay;
    private Integer advancePayment;
    private Integer monthlyPayment;
}
