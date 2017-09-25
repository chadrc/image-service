package com.chadrc.services.images.imagesservice;

import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ImagesServiceApplication {
	private static final Logger log = LoggerFactory.getLogger(ImagesServiceApplication.class);

	public static void main(String[] args) {
		openCVCheck();
		SpringApplication.run(ImagesServiceApplication.class, args);
	}

	private static void openCVCheck() {
		System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
		Mat mat = Mat.eye(3, 3, CvType.CV_8UC1);
		System.out.println(mat.dump());

		log.info("OpenCV initialized");
		log.info("OpenCV Version: " + Core.VERSION);
	}
}
