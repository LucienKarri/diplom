package com.transportsolution.transportsolution.service;

import org.springframework.web.multipart.MultipartFile;
import com.transportsolution.transportsolution.entity.AttachmentEntity;

public interface AttachmentService {

    AttachmentEntity saveAttachment(MultipartFile file) throws Exception;

    AttachmentEntity getAttachment(String fileId) throws Exception;

}
