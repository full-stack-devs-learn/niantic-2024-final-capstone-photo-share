package com.niantic.repositories;

import com.niantic.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MySqlPostDao implements PostDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlPostDao(DataSource dataSource)
    {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Post> getAllPosts()
    {
        List<Post> posts = new ArrayList<>();

        String sql = """
                    SELECT *
                    FROM posts
                    """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql);

        while(row.next())
        {
            int postId = row.getInt("post_id");
            int userId = row.getInt("user_id");
            String imgUrl = row.getString("img_url");
            String title = row.getString("title");
            String captions = row.getString("captions");
            int reactions = row.getInt("reactions");
            Integer albumId = (Integer) row.getObject("album_id");
            LocalDateTime createdAt = row.getTimestamp("created_at").toLocalDateTime();

            Post post = new Post(postId, userId, imgUrl, title, captions, reactions, albumId, createdAt);

            posts.add(post);
        }

        return posts;

    };

    public List<Post> getPostsByUserId(int userId)
    {
        List<Post> posts = new ArrayList<>();

        String sql = """
                    SELECT *
                    FROM posts
                    WHERE user_id = ?
                    """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql, userId);

        while(row.next())
        {
            int postId = row.getInt("post_id");
            userId = row.getInt("user_id");
            String imgUrl = row.getString("img_url");
            String title = row.getString("title");
            String captions = row.getString("captions");
            int reactions = row.getInt("reactions");
            Integer albumId = (Integer) row.getObject("album_id");
            LocalDateTime createdAt = row.getTimestamp("created_at").toLocalDateTime();

            Post post = new Post(postId, userId, imgUrl, title, captions, reactions, albumId, createdAt);

            posts.add(post);
        }

        return posts;
    }

    public List<Post> getPostsByAlbumId(Integer albumId)
    {
        List<Post> posts = new ArrayList<>();

        String sql = """
                    SELECT *
                    FROM posts
                    WHERE album_id = ?
                    """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql, albumId);

        while(row.next())
        {
            int postId = row.getInt("post_id");
            int userId = row.getInt("user_id");
            String imgUrl = row.getString("img_url");
            String title = row.getString("title");
            String captions = row.getString("captions");
            int reactions = row.getInt("reactions");
            albumId = (Integer) row.getObject("album_id");
            LocalDateTime createdAt = row.getTimestamp("created_at").toLocalDateTime();

            Post post = new Post(postId, userId, imgUrl, title, captions, reactions, albumId, createdAt);

            posts.add(post);
        }

        return posts;
    }

    public Post getPostById(int postId)
    {
        Post post = null;

        String sql = """
                    SELECT *
                    FROM posts
                    WHERE post_id = ?
                    """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql, postId);

        if(row.next())
        {
            postId = row.getInt("post_id");
            int userId = row.getInt("user_id");
            String imgUrl = row.getString("img_url");
            String title = row.getString("title");
            String captions = row.getString("captions");
            int reactions = row.getInt("reactions");
            Integer albumId = (Integer) row.getObject("album_id");
            LocalDateTime createdAt = row.getTimestamp("created_at").toLocalDateTime();

            post = new Post(postId, userId, imgUrl, title, captions, reactions, albumId, createdAt);

        }

        return post;
    }

    public Post addPost(Post post)
    {
        String sql = """
                    INSERT INTO posts
                    (user_id, img_url, title, captions, reactions, album_id)
                    VALUES (?,?,?,?,DEFAULT,?)
                    """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {

            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            statement.setInt(1, post.getUserId());
            statement.setString(2, post.getImgUrl());
            statement.setString(3, post.getTitle());
            statement.setString(4, post.getCaptions());

            if(post.getAlbumId() == null)
            {
                statement.setNull(5, Types.INTEGER);
            } else {
                statement.setInt(5, post.getAlbumId());
            }

            return statement;
        }, keyHolder);

        int newId = keyHolder.getKey().intValue();

        return getPostById(newId);
    }

    public boolean updatePost(int postId, Post post)
    {
        try
        {
            List<Object> sqlColumns = new ArrayList<>();
            StringBuilder sql = new StringBuilder("Update posts SET ");

            if (post.getImgUrl() != null) {
                sql.append("img_url = ?, ");
                sqlColumns.add(post.getImgUrl());
            }
            if (post.getTitle() != null) {
                sql.append("title = ?, ");
                sqlColumns.add(post.getTitle());
            }
            if (post.getCaptions() != null) {
                sql.append("captions = ?, ");
                sqlColumns.add(post.getCaptions());
            }
            if (post.getAlbumId() != null) {
                sql.append("album_id = ?, ");
                sqlColumns.add(post.getAlbumId());
            }

            sql.setLength(sql.length() - 2);
            sql.append(" WHERE post_id = ?;");
            sqlColumns.add(postId);

            jdbcTemplate.update(sql.toString(), sqlColumns.toArray());
            return true;

        }
        catch(Exception e)
        {
            return false;
        }
    }

    public boolean deletePost(int postId)
    {
        var postToDelete = getPostById(postId);

        if(postToDelete != null)
        {
            String sql = """
                DELETE FROM posts
                WHERE post_id = ?
                """;
            jdbcTemplate.update(sql, postId);

            return true;
        }
        return false;
    }
}
