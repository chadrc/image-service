package com.chadrc.services.images.imagesservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;

@RestController("image/")
public class ImageController {
    private final Logger log = LoggerFactory.getLogger(ImageController.class);

    @PostMapping
    public ResponseEntity uploadImage(@RequestParam("image") MultipartFile image) throws IOException {
        FileOutputStream outputStream = new FileOutputStream(image.getOriginalFilename());
        outputStream.write(image.getBytes());
        return ResponseEntity.ok(null);
    }
}
