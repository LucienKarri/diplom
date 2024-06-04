package com.transportsolution.transportsolution.model;

import java.time.LocalDateTime;
import com.transportsolution.transportsolution.entity.StatusEntity;
import lombok.Data;

@Data
public class ApplicationModel {
    private String id;

    private LocalDateTime createdDate;
    private LocalDateTime lastUpdatedDate;

    private StatusEntity status;

    private UserModel createBy;

}
