package com.chadrc.services.images.imagesservice;

public class ImageFocalPoint {
    private float x;
    private float y;

    public ImageFocalPoint() {

    }

    public ImageFocalPoint(float x, float y) {
        this.x = x;
        this.y = y;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }
}
