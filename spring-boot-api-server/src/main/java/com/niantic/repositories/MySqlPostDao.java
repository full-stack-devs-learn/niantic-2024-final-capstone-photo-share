package com.niantic.repositories;

import com.niantic.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class MySqlPostDao implements PostDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlPostDao(DataSource dataSource)
    {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

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
            String captions = row.getString("caption");
            int reactions = row.getInt("reactions");
            int albumId = row.getInt("album_id");
            Date createdAt = row.getDate("created_at");

            Post post = new Post(postId, userId, imgUrl, title, captions, reactions, albumId, createdAt);

            posts.add(post);
        }

        return posts;
    }

    public List<Post> getPostsByAlbumId(int albumId)
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
            String captions = row.getString("caption");
            int reactions = row.getInt("reactions");
            albumId = row.getInt("album_id");
            Date createdAt = row.getDate("created_at");

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
            String captions = row.getString("caption");
            int reactions = row.getInt("reactions");
            int albumId = row.getInt("album_id");
            Date createdAt = row.getDate("created_at");

            post = new Post(postId, userId, imgUrl, title, captions, reactions, albumId, createdAt);

        }

        return post;
    }

    public Post addPost(Post post)
    {
        String sql = """
                    INSERT INTO posts
                    (user_id, img_url, title, captions, reactions, album_id, created_at)
                    VALUES (?,?,?,?,?,?,?)
                    """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            statement.setInt(1, post.getUserId());
            statement.setString(2, post.getImgUrl());
            statement.setString(3, post.getTitle());
            statement.setString(4, post.getCaptions());
            statement.setInt(5, post.getReactions());
            statement.setInt(6, post.getAlbumId());
            statement.setDate(7, (java.sql.Date)post.getCreatedAt());

            return statement;
        }, keyHolder);

        int newId = keyHolder.getKey().intValue();

        return getPostById(newId);
    }

    public void updatePost(int postId, Post post)
    {
        String sql = """
                UPDATE Posts
                SET
                    user_id = ?,
                    img_url = ?,
                    title = ?,
                    captions = ?,
                    reactions = ?,
                    album_id = ?,
                    created_at = ?
                WHERE
                    post_id = ?;
                """;

        jdbcTemplate.update(sql
                , post.getUserId()
                , post.getImgUrl()
                , post.getTitle()
                , post.getCaptions()
                , post.getReactions()
                , post.getAlbumId()
                , post.getCreatedAt()
                , postId);
    }

    public void deletePost(int postId)
    {
        String sql = """
                DELETE FROM posts
                WHERE post_id = ?
                """;
        jdbcTemplate.update(sql, postId);
    }
}
