package com.chadrc.services.images.imagesservice;

import java.util.List;

public class ImageMetaListItem implements ImageMetaListable  {
    private ImageMeta meta;

    public ImageMetaListItem(ImageMeta meta) {
        this.meta = meta;
    }

    @Override
    public boolean isDirectory() {
        return false;
    }

    @Override
    public String getName() {
        return meta.getPath();
    }

    public Long getSize() {
        return meta.getSize();
    }

    public List<ImageFocalPoint> getFocalPoints() {
        return meta.getFocalPoints();
    }
}
