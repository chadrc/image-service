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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(makeSimpleResponse("Unknown error"));
        } catch (IOException ioException) {
            log.error("IO error", ioException);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(makeSimpleResponse("Unknown error"));
        }
        return ResponseEntity.ok(null);
    }

    @GetMapping(path = "/i/{path:.+}")
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

    @GetMapping(path = "/i/{path:.+}", params = {"height"})
    public ResponseEntity getImageScaleHeight(@PathVariable String path,
                                              @RequestParam Integer height,
                                              @RequestParam(required = false) Float aspect) {
        return getImageScaled(path, height, null, aspect);
    }

    @GetMapping(path = "/i/{path:.+}", params = {"width"})
    public ResponseEntity getImageScaleWidth(@PathVariable String path,
                                             @RequestParam Integer width,
                                             @RequestParam(required = false) Float aspect) {
        return getImageScaled(path, null, width, aspect);
    }

    private ResponseEntity getImageScaled(String path,
                                          Integer height,
                                          Integer width,
                                          Float aspect) {
        if (height == null && width == null) {
            return getImage(path);
        }

        log.info("Requesting image: " + path);
        String fullFileName = storeRoot + path;

        File file = new File(fullFileName);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        ImageMeta imageMeta;
        try {
            ObjectMapper mapper = new ObjectMapper();
            imageMeta = mapper.readValue(new File(fullFileName + ".meta.json"), ImageMeta.class);
        } catch (IOException ioException) {
            log.error("Failed to read image meta", ioException);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        Mat mat = Imgcodecs.imread(fullFileName);

        Size size = mat.size();

        if (aspect != null) {
            int aspectHeight = (int) size.height;
            int aspectWidth = (int) size.width;
            if (width == null) {
                aspectWidth = (int)((float) aspectHeight * aspect);
            }
            if (height == null) {
                aspectHeight = (int)((float) aspectWidth / aspect);
            }

            if (imageMeta.getFocalPoints().size() == 0) {
                log.error("No focal point for image: " + fullFileName);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }

            ImageFocalPoint focalPoint = imageMeta.getFocalPoints().get(0);
            int focalX = (int) (size.width * focalPoint.getX());
            int focalY = (int) (size.height * focalPoint.getY());
            int halfWidth = aspectWidth/2;
            int halfHeight = aspectHeight/2;

            int topX = focalX - halfWidth;
            int topY = focalY - halfHeight;

            Rect aspectRect = new Rect(topX, topY, aspectWidth, aspectHeight);
            mat = mat.submat(aspectRect);
            size = mat.size();
        }

        if (width == null) {
            double scale = (double) height / size.height;
            width = (int) (scale * size.width);
        }

        if (height == null) {
            double scale = (double) width / size.width;
            height = (int) (scale * size.height);
        }

        Size newSize = new Size(width, height);
        Mat resized = new Mat(newSize, mat.type());

        Imgproc.resize(mat, resized, newSize);

        MatOfByte matOfByte = new MatOfByte();
        String ext = path.substring(path.lastIndexOf("."));
        Imgcodecs.imencode(ext, resized, matOfByte, new MatOfInt());

        HttpHeaders headers = new HttpHeaders();
        byte[] bytes = matOfByte.toArray();
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(bytes.length)
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new ByteArrayResource(bytes));
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
