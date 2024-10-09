package com.niantic.repositories;

import com.niantic.models.Comment;
import com.niantic.models.Post;
import com.niantic.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class MySqlCommentDao implements CommentDao {

    private final JdbcTemplate jdbcTemplate;

    public MySqlCommentDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Comment> findByPostId(Long postId) {
        String sql = "SELECT * FROM comments WHERE post_id = ?";
        return jdbcTemplate.query(sql, new Object[]{postId}, this::mapRowToComment);
    }

    @Override
    public Comment save(Comment comment) {
        if (comment.getPost() == null) {
            throw new IllegalArgumentException("Post cannot be null when saving a comment.");
        }

        if (comment.getUser() == null) {
            throw new IllegalArgumentException("User cannot be null when saving a comment.");
        }

        String sql = "INSERT INTO comments (content, post_id, user_id, created_at) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, comment.getContent(), comment.getPost().getPostId(), comment.getUser().getId(), comment.getCreatedAt());
        return comment;
    }

    // Renamed to deleteById to match the interface
    @Override
    public void deleteById(Long id) {
        String sql = "DELETE FROM comments WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    // Mapping SQL ResultSet to Comment object
    private Comment mapRowToComment(ResultSet rs, int rowNum) throws SQLException {
        Comment comment = new Comment();
        comment.setId(rs.getLong("id"));
        comment.setContent(rs.getString("content"));

        // Set Post association
        Post post = new Post();
        post.setPostId(rs.getInt("post_id"));
        comment.setPost(post);

        // Set User association
        User user = new User();
        user.setId(rs.getInt("user_id"));
        comment.setUser(user);

        // Set the created_at timestamp
        comment.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());

        return comment;
    }
}