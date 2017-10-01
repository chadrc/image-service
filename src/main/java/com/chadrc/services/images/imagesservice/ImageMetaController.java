package com.chadrc.services.images.imagesservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

@RestController
@RequestMapping(path = "/m")
public class ImageMetaController {
    private final Logger log = LoggerFactory.getLogger(ImageMetaController.class);

    @Value("${service.images.store.root}")
    private String storeRoot;

    @PostConstruct
    public void postConstruct() {
        if (!storeRoot.endsWith("/")) {
            storeRoot += "/";
        }
    }

    @GetMapping(path = "/**")
    @ResponseBody
    public ResponseEntity getDir(HttpServletRequest request) {
        String path = request.getRequestURI().replace("/m/", "");
        if (path.endsWith("/")) {
            path = path.substring(0, path.length()-1);
        }
        ImageMetaListable list = makeImageMetaList(Paths.get(storeRoot, path).toString());
        if (list == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        if (StringUtils.isEmpty(path)) {
            list.setName("");
            list.setPath("");
        } else {
            int lastSlash = path.lastIndexOf("/") + 1;
            String name = path;
            if (lastSlash > 0 && lastSlash <= path.length()) {
                name = path.substring(lastSlash);
            }
            list.setName(name);
            list.setPath("/" + path.replace(name, ""));
        }
        return ResponseEntity.ok(list);
    }

    private ImageMetaListable makeImageMetaList(String path) {
        File item = new File(path);
        File[] files = null;
        if (item.isDirectory()) {
            files = item.listFiles();
        } else if (item.isFile()) {
            File metaFile = new File(path + ".meta.json");
            return makeImageMetaListItem(metaFile);
        }

        if (files == null) {
            log.error("Requested file is neither a file or directory: " + path);
            return null;
        }

        ImageMetaList imageMetaList = new ImageMetaList();
        for (File file : files) {
            if (file.isHidden()) {
                continue;
            }

            if (file.isDirectory()) {
                String dirName = file.getName();
                String dirPath = file.getPath()
                        .replace(storeRoot, "")
                        .replace(dirName, "");
                ImageMetaList meta = new ImageMetaList(dirName, dirPath);

                imageMetaList.addListable(meta);
            } else if (file.isFile()) {
                if (file.getAbsolutePath().endsWith(".meta.json")) {
                    ImageMetaListItem listItem = makeImageMetaListItem(file);
                    if (listItem != null) {
                        imageMetaList.addListable(listItem);
                    }
                }
            }
        }

        return imageMetaList;
    }

    private ImageMetaListItem makeImageMetaListItem(File file) {
        ImageMeta imageMeta;
        try {
            ObjectMapper mapper = new ObjectMapper();
            imageMeta = mapper.readValue(file, ImageMeta.class);
        } catch (IOException ioException) {
            log.error("Failed to read image meta: " + file.getAbsolutePath(), ioException);
            return null;
        }

        imageMeta.setPath(imageMeta.getPath().replace(storeRoot, ""));

        return new ImageMetaListItem(imageMeta);
    }
}
