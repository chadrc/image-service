package com.chadrc.services.images.imagesservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController("image/")
public class ImageController {
    private final Logger log = LoggerFactory.getLogger(ImageController.class);

    @Value("${service.images.store.root}")
    private String storeRoot;

    @PostConstruct
    public void postConstruct() {
        if (!storeRoot.endsWith("/")) {
            storeRoot += "/";
        }
    }

    @PostMapping
    public ResponseEntity uploadImage(@RequestParam("image") MultipartFile image) {
        String fullFileName = storeRoot + image.getOriginalFilename();
        File file = new File(fullFileName);
        if (file.exists()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(makeConflictResponse());
        }

        try {
            FileOutputStream outputStream = new FileOutputStream(fullFileName);
            outputStream.write(image.getBytes());
        } catch (FileNotFoundException fileNotFoundException) {
            log.error("File not found", fileNotFoundException);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(makeSimpleResponse("Unknown error"));
        } catch (IOException ioException) {
            log.error("IO error", ioException);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(makeSimpleResponse("Unknown error"));
        }
        return ResponseEntity.ok(null);
    }

    private Map<String, String> makeConflictResponse() {
        return makeSimpleResponse("File with given name already exists. Please choose a different name.");
    }

    private Map<String, String> makeSimpleResponse(String message) {
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return response;
    }
}
