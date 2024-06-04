package com.transportsolution.transportsolution.service;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import com.transportsolution.transportsolution.entity.AttachmentEntity;
import com.transportsolution.transportsolution.repository.AttachmentRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AttachmentServiceImpl implements AttachmentService {

    private AttachmentRepository attachmentRepository;


    @Override
    public AttachmentEntity saveAttachment(MultipartFile file) throws Exception {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if (fileName.contains("..")) {
                throw new Exception("Filename contains invalid psth sequence " + fileName);
            }

            AttachmentEntity attachmentEntity =
                    new AttachmentEntity(fileName, file.getContentType(), file.getBytes());
            return attachmentRepository.save(attachmentEntity);
        } catch (Exception e) {
            throw new Exception("could not save File: " + fileName);
        }
    }

    @Override
    public AttachmentEntity getAttachment(String fileId) throws Exception {
        return attachmentRepository.findById(fileId)
                .orElseThrow(() -> new Exception("File not found with Id: " + fileId));
    }

    @Override
    public void deleteAttachment(String fileId) {
        attachmentRepository.deleteById(fileId);
    }

}
