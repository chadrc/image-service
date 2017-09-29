package com.chadrc.services.images.imagesservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.xml.ws.Response;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

    @PostMapping(path = "/image")
    public ResponseEntity uploadImage(@RequestParam("image") MultipartFile image) {
        String fullFileName = storeRoot + image.getOriginalFilename();
        File file = new File(fullFileName);
        if (file.exists()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(makeConflictResponse());
        }

        try {
            List<ImageFocalPoint> focalPoints = new ArrayList<>();
            focalPoints.add(new ImageFocalPoint(.5f, .5f));
            ImageMeta meta = new ImageMeta(fullFileName, image.getSize(), focalPoints);
            ObjectMapper mapper = new ObjectMapper();
            String metaJson = mapper.writeValueAsString(meta);

            FileOutputStream metaOutputStream = new FileOutputStream(fullFileName + ".meta.json");
            metaOutputStream.write(metaJson.getBytes());

            FileOutputStream imageOutputStream = new FileOutputStream(fullFileName);
            imageOutputStream.write(image.getBytes());
        } catch (FileNotFoundException fileNotFoundException) {
            log.error("File not found", fileNotFoundException);
            return makeUnknownErrorResponse();
        } catch (IOException ioException) {
            log.error("IO error", ioException);
            return makeUnknownErrorResponse();
        }
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/folder")
    public ResponseEntity addFolder(@RequestParam("name") String name) {
        String fullDir = storeRoot + name;

        File file = new File(fullDir);
        if (file.exists()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(makeConflictResponse());
        }

        boolean created = file.mkdir();

        if (!created) {
            return makeUnknownErrorResponse();
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

    private ResponseEntity makeUnknownErrorResponse() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(makeSimpleResponse("Unknown error"));
    }
}
