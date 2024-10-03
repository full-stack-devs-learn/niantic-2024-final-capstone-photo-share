package com.niantic.models;

import jakarta.validation.constraints.NotBlank;

import java.util.Date;

public class Post
{
    private int postId;
    @NotBlank
    private int userId;
    @NotBlank(message="Upload image")
    private String imgUrl;
    @NotBlank(message="Add title")
    private String title;
    @NotBlank(message="Add captions")
    private String captions;
    private int reactions;
    private int albumId;
    private Date createdAt;

    public Post(int postId, int userId, String imgUrl, String title, String captions, int reactions, int albumId, Date createdAt) {
        this.postId = postId;
        this.userId = userId;
        this.imgUrl = imgUrl;
        this.title = title;
        this.captions = captions;
        this.reactions = reactions;
        this.albumId = albumId;
        this.createdAt = createdAt;
    }

    public Post(){}

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCaptions() {
        return captions;
    }

    public void setCaptions(String captions) {
        this.captions = captions;
    }

    public int getReactions() {
        return reactions;
    }

    public void setReactions(int reactions) {
        this.reactions = reactions;
    }

    public int getAlbumId() {
        return albumId;
    }

    public void setAlbumId(int albumId) {
        this.albumId = albumId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
