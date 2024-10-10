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
        String sql = "SELECT c.*, u.username FROM comments c " +
                "JOIN users u ON c.user_id = u.user_id WHERE c.post_id = ?";
        return jdbcTemplate.query(sql, new Object[]{postId}, this::mapRowToComment);
    }

    @Override
    public Comment save(Comment comment) {
        
        String sql = "INSERT INTO comments (content, post_id, user_id, created_at) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, comment.getContent(), comment.getPost().getPostId(), comment.getUser().getId(), comment.getCreatedAt());

        String fetchSql = "SELECT c.*, u.username FROM comments c JOIN users u ON c.user_id = u.user_id WHERE c.id = LAST_INSERT_ID()";
        return jdbcTemplate.queryForObject(fetchSql, this::mapRowToComment);
    }


    @Override
    public void deleteById(Long id) {
        String sql = "DELETE FROM comments WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    private Comment mapRowToComment(ResultSet rs, int rowNum) throws SQLException {
        Comment comment = new Comment();
        comment.setId(rs.getLong("id"));
        comment.setContent(rs.getString("content"));


        Post post = new Post();
        post.setPostId(rs.getInt("post_id"));
        comment.setPost(post);


        User user = new User();
        user.setId(rs.getInt("user_id"));
        user.setUsername(rs.getString("username"));
        comment.setUser(user);


        comment.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());

        return comment;
    }
}