package com.transportsolution.transportsolution.controller;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.transportsolution.transportsolution.entity.AttachmentEntity;
import com.transportsolution.transportsolution.model.AttachmentResponse;
import com.transportsolution.transportsolution.model.PdfModel;
import com.transportsolution.transportsolution.service.AttachmentService;
import com.transportsolution.transportsolution.service.CustomMultipartFile;
import com.transportsolution.transportsolution.service.PDFService;

@RestController
public class AttachmentController {

        private AttachmentService attachmentService;
        private PDFService pdfService;

        public AttachmentController(AttachmentService attachmentService, PDFService pdfService) {
                this.attachmentService = attachmentService;
                this.pdfService = pdfService;
        }

        @PostMapping("/upload")
        public AttachmentResponse uploadFile(@RequestParam("file") MultipartFile file)
                        throws Exception {
                AttachmentEntity attachmentEntity = null;
                attachmentEntity = attachmentService.saveAttachment(file);

                return new AttachmentResponse(attachmentEntity.getFileName(), file.getContentType(),
                                attachmentEntity.getId(), file.getSize());
        }

        @PostMapping("/upload/pdf")
        public AttachmentResponse createPDF(@RequestBody PdfModel model) throws Exception {
                byte[] bytes = pdfService.createPdf(model);

                CustomMultipartFile file = new CustomMultipartFile(bytes, "JOPA.pdf");

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

        @DeleteMapping("/upload/{fileId}")
        public void deleteFile(@PathVariable String fileId) {
                attachmentService.deleteAttachment(fileId);
        }

}
