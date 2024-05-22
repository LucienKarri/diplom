package com.transportsolution.transportsolution;

import java.io.IOException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.transportsolution.transportsolution.service.PDFServiceImpl;

@SpringBootApplication
public class TransportSolutionApplication {


	public static void main(String[] args) throws IOException {
		SpringApplication.run(TransportSolutionApplication.class, args);

		new PDFServiceImpl().createPdf();


	}

}
