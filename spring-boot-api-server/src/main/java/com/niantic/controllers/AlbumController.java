package com.niantic.controllers;

import com.niantic.models.Album;
import com.niantic.models.Post;
import com.niantic.repositories.MySqlAlbumDao;
import com.niantic.repositories.MySqlPostDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/albums")
public class AlbumController {

    @Autowired
    MySqlAlbumDao mySqlAlbumDao;
    @Autowired
    MySqlPostDao mySqlPostDao;

    @GetMapping
    public ResponseEntity<?> getAllAlbums()
    {
        try
        {
            var result = mySqlAlbumDao.getAllAlbums();

            if(result == null)
            {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(result);
        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().body("An  internal server error");
        }
    }

    @GetMapping(params = "{profileId}")
    public ResponseEntity<?> getAllAlbumsByProfileId(@RequestParam int profileId)
    {
        try
        {
            var result = mySqlAlbumDao.getAllAlbumsByUserId(profileId);

            if(result == null)
            {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(result);
        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().body("An  internal server error");
        }
    }

    @GetMapping(path = "{albumId}")
    public ResponseEntity<?> getAlbum(@PathVariable int albumId)
    {
        try
        {
            var result = mySqlAlbumDao.getAlbum(albumId);

            if(result == null)
            {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(result);
        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().body("An  internal server error");
        }
    }

    @PostMapping
    public ResponseEntity<?> addAlbum(Album album)
    {
        Album newAlbum = mySqlAlbumDao.addAlbum(album);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAlbum);
    }

    @DeleteMapping(path = "{albumId}")
    public ResponseEntity<?> deleteAlbum(@PathVariable int  albumId)
    {
        boolean isSuccessful = mySqlAlbumDao.deleteAlbum(albumId);

        if(isSuccessful)
        {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}
