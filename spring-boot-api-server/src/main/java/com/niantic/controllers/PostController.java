package com.niantic.controllers;

import com.niantic.models.Post;
import com.niantic.repositories.MySqlAlbumDao;
import com.niantic.repositories.MySqlPostDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private MySqlPostDao mySqlPostDao;
    @Autowired
    private MySqlAlbumDao mySqlAlbumDao;

    @GetMapping(params = {"page","size"})
    public ResponseEntity<?> getAllPosts(@RequestParam int page,
                                         @RequestParam int size,
                                         @RequestParam(required = false) Integer userId)
    {
        try
        {
            List<Post> results;

            if(userId != null)
            {
                results = mySqlPostDao.getAllPostWithUsersInteractions(page, size, userId);
            } else {
                results = mySqlPostDao.getAllPosts(page, size);
            }

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
            var result = mySqlPostDao.getPost(postId);

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

    @GetMapping(path = "/profile/{profileId}")
    public ResponseEntity<?> getPostByProfileId(@PathVariable int profileId)
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

    @GetMapping(path = "/album/{albumId}")
    public ResponseEntity<?> getPostByAlbumId(@PathVariable int albumId)
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
    public ResponseEntity<?> addPost(@RequestBody Post post)
    {
        Post newPost = mySqlPostDao.addPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(newPost);
    }
    @PostMapping("/interact")
    public ResponseEntity<?> interactPost(@RequestParam int postId, @RequestParam int userId)
    {
        try
        {
            boolean isSuccessful = mySqlPostDao.interactPost(postId, userId);
            if(!isSuccessful){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping(path = "{postId}")
    public ResponseEntity<?> updatePost(@PathVariable int postId, @RequestBody Post post)
    {
        try
        {
            Post targetPost = mySqlPostDao.getPost(postId);
            if(targetPost == null)
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
            }

            boolean isSuccessful = mySqlPostDao.updatePost(postId, post);
            if(!isSuccessful)
            {
                return ResponseEntity.badRequest().build();
            }
            Post updatedPost = mySqlPostDao.getPost(postId);
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
