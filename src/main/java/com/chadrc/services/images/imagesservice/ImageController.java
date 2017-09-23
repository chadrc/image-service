package com.chadrc.services.images.imagesservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.xml.ws.Response;
import java.io.*;
import java.util.HashMap;
import java.util.Map;

@RestController()
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

    @PostMapping(path = "image/")
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

    @GetMapping(path = "/{path:.+}")
    public ResponseEntity getImage(@PathVariable String path) {
        log.info("Requesting image: " + path);
        String fullFileName = storeRoot + path;

        HttpHeaders headers = new HttpHeaders();
        File file;
        InputStreamResource resource;

        try {
            file = new File(fullFileName);
            resource = new InputStreamResource(new FileInputStream(file));
        } catch (FileNotFoundException fileNotFoundException) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.length())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resource);
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
