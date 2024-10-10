package com.niantic.models;

import lombok.Setter;

import java.time.LocalDateTime;

public class Comment {

    @Setter
    private Long id;
    @Setter
    private String content;
    private Post post;
    private User user;
    @Setter
    private LocalDateTime createdAt;

    public Comment() {
        this.createdAt = LocalDateTime.now();
    }


    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        if (post == null) {
            throw new IllegalArgumentException("Post cannot be null for a comment.");
        }
        this.post = post;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null for a comment.");
        }
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

}