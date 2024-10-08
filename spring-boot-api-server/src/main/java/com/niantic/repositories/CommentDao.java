package com.niantic.repositories;

import com.niantic.models.Comment;
import java.util.List;

public interface CommentDao {

    List<Comment> findByPostId(Long postId);
    Comment save(Comment comment);

    void deleteById(Long id);
}