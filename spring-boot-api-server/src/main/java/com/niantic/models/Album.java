package com.niantic.models;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Album
{
    private int albumId;
    private int userId;
    private String title;
    private String description;
    private LocalDateTime createdAt;

}
