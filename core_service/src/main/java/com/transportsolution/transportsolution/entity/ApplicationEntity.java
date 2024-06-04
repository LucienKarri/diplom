package com.transportsolution.transportsolution.entity;

import java.time.LocalDateTime;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
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
public class ApplicationEntity {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastUpdatedDate;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private StatusEntity status;

    private String createBy;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = true)
    private VehicleEntity vehicle;


    @ManyToOne(optional = true)
    @JoinColumn(name = "attachment_id", nullable = true)
    private AttachmentEntity attachment;

    @Column(nullable = true)
    private Integer amountOfCredit;

    @Column(nullable = true)
    private Integer creditTerm;

    @Column(nullable = true)
    private Integer paymentDay;

    @Column(nullable = true)
    private Integer advancePayment;

    @Column(nullable = true)
    private Integer monthlyPayment;

    @Column(nullable = true)
    private String companyAdress;

}
