package com.chadrc.services.images.imagesservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity getDir(HttpServletRequest request) {
        String path = request.getRequestURI().replace("/m/", "");
        ImageMetaList list = makeImageMetaList(Paths.get(storeRoot, path).toString());
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

    private ImageMetaList makeImageMetaList(String path) {
        File dir = new File(path);
        File[] files = dir.listFiles();
        if (files == null) {
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
                    ImageMeta imageMeta;
                    try {
                        ObjectMapper mapper = new ObjectMapper();
                        imageMeta = mapper.readValue(file, ImageMeta.class);
                    } catch (IOException ioException) {
                        log.error("Failed to read image meta: " + file.getAbsolutePath(), ioException);
                        continue;
                    }

                    imageMeta.setPath(imageMeta.getPath().replace(storeRoot, ""));
                    imageMetaList.addListable(new ImageMetaListItem(imageMeta));
                }
            }
        }

        return imageMetaList;
    }
}
