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
        return meta.getName();
    }

    @Override
    public void setName(String name) {
        this.meta.setName(name);
    }

    @Override
    public String getPath() {
        return meta.getPath();
    }

    @Override
    public void setPath(String path) {
        this.meta.setPath(path);
    }


    public Long getSize() {
        return meta.getSize();
    }

    public List<ImageFocalPoint> getFocalPoints() {
        return meta.getFocalPoints();
    }
}
