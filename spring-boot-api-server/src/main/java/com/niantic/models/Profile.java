package com.niantic.models;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Profile {

    int profileId;
    int userId;
    String userName;
    String profileImg;
    String bio;

}
