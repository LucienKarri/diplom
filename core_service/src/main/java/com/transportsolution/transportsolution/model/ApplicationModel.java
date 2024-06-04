package com.transportsolution.transportsolution.model;

import java.time.LocalDateTime;
import com.transportsolution.transportsolution.entity.AttachmentEntity;
import com.transportsolution.transportsolution.entity.StatusEntity;
import com.transportsolution.transportsolution.entity.VehicleEntity;
import lombok.Data;

@Data
public class ApplicationModel {
    private String id;

    private LocalDateTime createdDate;
    private LocalDateTime lastUpdatedDate;

    private StatusEntity status;

    private UserModel createBy;

    private VehicleEntity vehicle;
    private Integer amountOfCredit;
    private Integer creditTerm;
    private Integer paymentDay;
    private Integer advancePayment;
    private Integer monthlyPayment;

    private AttachmentEntity attachment;

    private String companyAdress;

}
