package com.niantic.controllers;

import com.niantic.models.Profile;
import com.niantic.repositories.MySqlProfileDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/profiles")
public class ProfileController {

    @Autowired
    MySqlProfileDao mySqlProfileDao;

    @GetMapping(params = {"page", "size"})
    public ResponseEntity<?> getProfiles(@RequestParam int page, @RequestParam int size)
    {
        try
        {
            var results = mySqlProfileDao.getAllProfiles(page, size);
            if(results.isEmpty())
            {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(results);

        } catch (Exception e)
        {
            return ResponseEntity.internalServerError().build();
        }

    }

    @GetMapping(path = "/total")
    public ResponseEntity<?> getTotalProfileCount()
    {
        Map<String, Integer> response = new HashMap<>();
        response.put("TotalProfiles", mySqlProfileDao.getTotalProfileCount());

        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "{profileId}")
    public ResponseEntity<?> getProfileById(@PathVariable int profileId)
    {
        var result = mySqlProfileDao.getProfile(profileId);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<?> addProfile(Profile profile)
    {
        var newProfile = mySqlProfileDao.addProfile(profile);
        return ResponseEntity.ok(newProfile);
    }

    @PutMapping(path = "{profileId}")
    public ResponseEntity<?> updateProfile(@PathVariable int profileId, @RequestBody Profile profile)
    {
        try
        {
            Profile targetProfile = mySqlProfileDao.getProfile(profileId);
            if(targetProfile == null){
                return ResponseEntity.notFound().build();
            }

            boolean isSuccessful = mySqlProfileDao.updateProfile(profileId, profile);
            if(!isSuccessful)
            {
                return ResponseEntity.badRequest().build();
            }
            targetProfile = mySqlProfileDao.getProfile(profileId);
            return ResponseEntity.ok(targetProfile);

        }
        catch(Exception e)
        {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping(path = "{profileId}")
    public ResponseEntity<?> deleteProfile(@PathVariable int profileId)
    {
        boolean isSuccessful = mySqlProfileDao.deleteProfile(profileId);

        if(isSuccessful)
        {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}
