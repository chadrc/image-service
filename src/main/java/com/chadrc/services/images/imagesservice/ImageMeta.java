package com.chadrc.services.images.imagesservice;

import java.util.List;

public class ImageMeta {
    private String path;
    private long size;
    private List<ImageFocalPoint> focalPoints;

    public ImageMeta() {

    }

    public ImageMeta(String path, long size, List<ImageFocalPoint> focalPoints) {
        this.path = path;
        this.size = size;
        this.focalPoints = focalPoints;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public long getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public List<ImageFocalPoint> getFocalPoints() {
        return focalPoints;
    }

    public void setFocalPoints(List<ImageFocalPoint> focalPoints) {
        this.focalPoints = focalPoints;
    }
}
