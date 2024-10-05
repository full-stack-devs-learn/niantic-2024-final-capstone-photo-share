package com.niantic.controllers;

import com.niantic.repositories.MySqlProfileDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/profiles")
public class ProfileController {

    @Autowired
    MySqlProfileDao mySqlProfileDao;

    @GetMapping(path = "{profileId}")
    public ResponseEntity<?> getProfileById(@PathVariable int profileId)
    {
        var result = mySqlProfileDao.getProfile(profileId);
        return ResponseEntity.ok(result);
    }
}
