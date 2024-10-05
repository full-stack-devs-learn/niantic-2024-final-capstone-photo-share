package com.niantic.repositories;

import com.niantic.models.Post;
import java.util.List;

public interface PostDao {

    List<Post> getAllPosts();

    List<Post> getPostsByUserId(int userId);

    List<Post> getPostsByAlbumId(Integer albumId);

    Post getPost(int postId);

    Post addPost(Post post);

    boolean updatePost(int postId, Post post);

    boolean deletePost(int postId);
}
