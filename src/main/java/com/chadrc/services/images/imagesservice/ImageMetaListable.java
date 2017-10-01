package com.chadrc.services.images.imagesservice;

public interface ImageMetaListable {
    boolean isDirectory();
    String getName();
    void setName(String name);
    String getPath();
    void setPath(String path);
}
