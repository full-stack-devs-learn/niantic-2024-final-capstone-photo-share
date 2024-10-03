package com.niantic.repositories;

import com.niantic.models.Post;
import java.util.List;

public interface PostDao {

    List<Post> getPostsByUserId(int userId);

    List<Post> getPostsByAlbumId(int albumId);

    Post getPostById(int postId);

    Post addPost(Post post);

    void updatePost(int postId, Post post);

    void deletePost(int postId);
}
