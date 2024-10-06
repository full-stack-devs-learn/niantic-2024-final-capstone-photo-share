package com.niantic.repositories;

import com.niantic.models.Profile;

import java.util.List;

public interface ProfileDao {

    List<Profile> getAllProfiles(int page, int size);
    int getTotalProfileCount();
    Profile getProfile(int profileId);
    Profile addProfile(Profile profile);
    boolean updateProfile(int profileId, Profile profile);
    boolean deleteProfile(int profileId);
}
