package com.transportsolution.transportsolution.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttachmentResponse {
    private String fileName;
    private String fileType;
    private String id;
    private long fileSize;
}
