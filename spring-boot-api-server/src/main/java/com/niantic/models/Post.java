package com.niantic.models;

import java.time.LocalDateTime;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post
{
    private int postId;
    private int userId;
    private String publicId;
    private String title;
    private String captions;
    private int reactions;
    private Integer albumId;
    private LocalDateTime createdAt;
    private Boolean hasInteracted;

}
