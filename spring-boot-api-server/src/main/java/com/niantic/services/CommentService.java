package com.niantic.services;

import com.niantic.models.Comment;
import com.niantic.repositories.CommentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentDao commentDao;

    public List<Comment> getCommentsByPhotoId(Long photoId) {
        return commentDao.findByPostId(photoId);
    }

    public Comment addComment(Comment comment) {
        return commentDao.save(comment);
    }

    public void deleteComment(Long id) {
        commentDao.deleteById(id);
    }
}