package com.transportsolution.transportsolution.service;

import java.io.IOException;
import com.transportsolution.transportsolution.model.PdfModel;

public interface PDFService {
    byte[] createPdf(PdfModel model) throws IOException, Exception;
}
