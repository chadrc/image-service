package com.chadrc.services.images.imagesservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.core.MatOfInt;
import org.opencv.core.Size;
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
                                   @RequestParam Integer height) {
        return getImageScaled(path, height, null);
    }

    @GetMapping(path = "/i/{path:.+}", params = {"width"})
    public ResponseEntity getImageScaleWidth(@PathVariable String path,
                                   @RequestParam Integer width) {
        return getImageScaled(path, null, width);
    }

    private ResponseEntity getImageScaled(@PathVariable String path,
                                   @RequestParam Integer height,
                                   @RequestParam Integer width) {
        log.info("Resize Request: (" + height + ", " + width + ")");
        if (height == null && width == null) {
            return getImage(path);
        }

        log.info("Requesting image: " + path);
        String fullFileName = storeRoot + path;

        HttpHeaders headers = new HttpHeaders();
        File file = new File(fullFileName);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        Mat mat = Imgcodecs.imread(fullFileName);

        Size size = mat.size();

        if (width == null && height != null) {
            double scale = (double) height / size.height;
            width = (int) (scale * size.width);
        }

        if (height == null && width != null) {
            double scale = (double) width / size.width;
            height = (int) (scale * size.height);
        }

        Size newSize = new Size(width, height);
        Mat resized = new Mat(newSize, mat.type());

        Imgproc.resize(mat, resized, newSize);

        MatOfByte matOfByte = new MatOfByte();
        String ext = path.substring(path.lastIndexOf("."));
        Imgcodecs.imencode(ext, resized, matOfByte, new MatOfInt());

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
