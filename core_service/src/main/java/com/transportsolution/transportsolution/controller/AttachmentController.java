package com.transportsolution.transportsolution.controller;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.transportsolution.transportsolution.entity.AttachmentEntity;
import com.transportsolution.transportsolution.model.AttachmentResponse;
import com.transportsolution.transportsolution.service.AttachmentService;

@RestController
public class AttachmentController {

        private AttachmentService attachmentService;

        public AttachmentController(AttachmentService attachmentService) {
                this.attachmentService = attachmentService;
        }

        @PostMapping("/upload")
        public AttachmentResponse uploadFile(@RequestParam("file") MultipartFile file)
                        throws Exception {
                AttachmentEntity attachmentEntity = null;
                attachmentEntity = attachmentService.saveAttachment(file);

                return new AttachmentResponse(attachmentEntity.getFileName(), file.getContentType(),
                                attachmentEntity.getId(), file.getSize());
        }

        @GetMapping("/download/{fileId}")
        public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) throws Exception {
                AttachmentEntity attachmentEntity = null;
                attachmentEntity = attachmentService.getAttachment(fileId);

                return ResponseEntity.ok()
                                .contentType(MediaType
                                                .parseMediaType(attachmentEntity.getFileType()))
                                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""
                                                + attachmentEntity.getFileName() + "\"")
                                .body(new ByteArrayResource(attachmentEntity.getData()));
        }
}
