package com.niantic.repositories;

import com.niantic.models.Profile;

import java.util.List;

public interface ProfileDao {

    List<Profile> getAllProfiles();

    Profile getProfile(int profileId);

    List<Profile> searchProfiles(String query);
    Profile addProfile(Profile profile);
    boolean updateProfile(int profileId, Profile profile);
    boolean deleteProfile(int profileId);
}
