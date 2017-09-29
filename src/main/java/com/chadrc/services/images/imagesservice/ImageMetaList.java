package com.chadrc.services.images.imagesservice;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class ImageMetaList implements ImageMetaListable {
    private List<ImageMetaListable> items = new ArrayList<>();
    private String name;
    private String path;

    public ImageMetaList() {

    }

    public ImageMetaList(String name, String path) {
        this.name = name;
        this.path = path;
    }

    @Override
    public boolean isDirectory() {
        return true;
    }

    public List<ImageMetaListable> getItems() {
        return items;
    }

    public void addListable(@NotNull ImageMetaListable listable) {
        items.add(listable);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
