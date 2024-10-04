package com.niantic.controllers;

import com.niantic.repositories.MySqlAlbumDao;
import com.niantic.repositories.MySqlPostDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/post")
public class PostController {

    @Autowired
    private MySqlPostDao mySqlPostDao;
    @Autowired
    private MySqlAlbumDao mySqlAlbumDao;

    @GetMapping
    public ResponseEntity<?> getAllPosts()
    {
        try
        {
            var results = mySqlPostDao.getAllPosts();

            if(results.isEmpty())
            {
                //404 Error
            }
            return ResponseEntity.ok(results);
        }
        catch (Exception e)
        {
            //Server Error
            return ResponseEntity.internalServerError().body("test");
        }
    }
}
