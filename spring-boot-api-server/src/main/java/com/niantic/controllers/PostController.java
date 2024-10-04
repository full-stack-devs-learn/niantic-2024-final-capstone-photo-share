package com.niantic.controllers;

import com.niantic.models.Post;
import com.niantic.repositories.MySqlAlbumDao;
import com.niantic.repositories.MySqlPostDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(results);
        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().body("An  internal server error");
        }
    }

    @GetMapping(path = "{postId}")
    public ResponseEntity<?> getPost(@PathVariable int postId)
    {
        try
        {
            var result = mySqlPostDao.getPostById(postId);

            if(result == null)
            {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(result);
        }
        catch (Exception e)
        {
            //Server Error
            return ResponseEntity.internalServerError().body("An  internal server error");
        }
    }

    @GetMapping(params = "profileId")
    public ResponseEntity<?> getPostByProfileId(@RequestParam int profileId)
    {
        try
        {
            var result = mySqlPostDao.getPostsByUserId(profileId);

            if(result.isEmpty())
            {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(result);
        }
        catch (Exception e)
        {
            //Server Error
            return ResponseEntity.internalServerError().body("An  internal server error");
        }
    }

    @GetMapping(params = "albumId")
    public ResponseEntity<?> getPostByAlbumId(@RequestParam int albumId)
    {
        try
        {
            var result = mySqlPostDao.getPostsByAlbumId(albumId);
            if(result.isEmpty())
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
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> addPost(@RequestBody Post post)
    {
        Post newPost = mySqlPostDao.addPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(newPost);
    }

    @PutMapping(path = "{postId}")
    public ResponseEntity<?> updatePost(@PathVariable int postId, @RequestBody Post post)
    {
        try
        {
            Post targetPost = mySqlPostDao.getPostById(postId);
            if(targetPost == null)
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
            }

            boolean isSuccessful = mySqlPostDao.updatePost(postId, post);
            if(!isSuccessful)
            {
                return ResponseEntity.badRequest().build();
            }
            Post updatedPost = mySqlPostDao.getPostById(postId);
            return ResponseEntity.ok(updatedPost);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping(path = "{postId}")
    public ResponseEntity<?> deletePost(@PathVariable int postId)
    {
        boolean isSuccessful = mySqlPostDao.deletePost(postId);

        if(isSuccessful)
        {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

}
