package com.niantic.repositories;

import com.niantic.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
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

    @Override
    public List<Post> getAllPosts(int page, int size)
    {
        int offset = (page-1) * size;

        String sql = """
                    SELECT
                        *
                    FROM
                        posts
                    ORDER BY
                        created_at DESC
                    LIMIT
                        ?
                    OFFSET
                        ?
                    """;

        List<Post> results = jdbcTemplate.query(
                sql,
                new Object[]{size, offset},
                new PostRowMapper()
        );

        List<Post> posts = results.isEmpty()
                ? null
                : results;

        return posts;
    };

    @Override
    public List<Post> getAllPostWithUsersInteractions(int page, int size, int userId)
    {
        int offset = (page-1) * size;

        String sql = """
                    SELECT
                        p.*,
                        CASE WHEN pi.post_id IS NOT NULL THEN 1 ELSE 0 END AS has_interacted
                    FROM
                        posts p
                    LEFT JOIN
                        post_interactions pi ON p.post_id = pi.post_id
                    AND
                        pi.user_id = ?
                    ORDER BY
                        p.created_at DESC
                    LIMIT
                        ?
                    OFFSET
                        ?
                    """;

        List<Post> results = jdbcTemplate.query(
                sql,
                new Object[]{userId, size, offset},
                new PostRowMapper()
        );

        List<Post> posts = results.isEmpty()
                ? null
                : results;

        return posts;

    }

    @Override
    public List<Post> getPostsByUserId(int userId)
    {
        String sql = """
                    SELECT
                        *
                    FROM
                        posts
                    WHERE
                        user_id = ?
                    """;

        List<Post> results = jdbcTemplate.query(
                sql,
                new Object[]{userId},
                new PostRowMapper()
        );

        List<Post> posts = results.isEmpty()
                ? null
                : results;

        return posts;
    }

    @Override
    public List<Post> getPostsByAlbumId(Integer albumId)
    {
        String sql = """
                    SELECT *
                        FROM posts
                    WHERE
                        album_id = ?
                    """;

        List<Post> results = jdbcTemplate.query(
                sql,
                new Object[]{albumId},
                new PostRowMapper()
        );

        List<Post> posts = results.isEmpty()
                ? null
                : results;

        return posts;
    }

    @Override
    public Post getPost(int postId)
    {
        String sql = """
                    SELECT
                        *
                    FROM
                        posts
                    WHERE
                        post_id = ?
                    """;

         List<Post> result = jdbcTemplate.query(
                 sql,
                 new Object[]{postId},
                 new PostRowMapper()
         );

        Post post = result.isEmpty()
                ? null
                : result.getFirst();

        return post;
    }

    @Override
    public Post addPost(Post post)
    {
        String sql = """
                    INSERT INTO
                        posts
                        (user_id, public_id, title, captions, reactions, album_id)
                    VALUES
                        (?,?,?,?,DEFAULT,?)
                    """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {

            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            statement.setInt(1, post.getUserId());
            statement.setString(2, post.getPublicId());
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

        return this.getPost(newId);
    }

    @Override
    public boolean updatePost(int postId, Post post)
    {
        try
        {
            List<Object> sqlColumns = new ArrayList<>();
            StringBuilder sql = new StringBuilder("Update posts SET ");

            if (post.getPublicId() != null) {
                sql.append("public_id = ?, ");
                sqlColumns.add(post.getPublicId());
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

    @Override
    public boolean deletePost(int postId)
    {
        var postToDelete = this.getPost(postId);

        if(postToDelete != null)
        {
            String sql = """
                DELETE FROM
                    posts
                WHERE
                    post_id = ?
                """;
            jdbcTemplate.update(sql, postId);

            return true;
        }

        return false;
    }

    @Override
    public boolean interactPost(int postId, int userId)
    {
        try {
            String checkSql = """
                        SELECT
                            COUNT(*)
                        FROM
                            post_interactions
                        WHERE
                            post_id = ?
                        AND
                            user_id = ?
                        """;

            var results = jdbcTemplate.query(
                        checkSql,
                        new Object[]{postId, userId},
                        (rs, rowNum) -> rs.getInt(1));

            int count = results.getFirst();

            if(count >= 1)
            {
                String sql = """
                    DELETE FROM
                        post_interactions
                    WHERE
                        post_id = ?
                    AND
                        user_id = ?
                    """;

                jdbcTemplate.update(sql, postId, userId);
                return true;
            }
            String sql = """
                    INSERT INTO
                        post_interactions
                        (post_id, user_id)
                    VALUES
                        (?,?)
                    """;

            jdbcTemplate.update(sql, postId, userId);
            return true;

        } catch (Exception e)
        {
            //SERVER ERROR
            return false;
        }
    }

    public static class PostRowMapper implements RowMapper<Post>
    {

        @Override
        public Post mapRow(ResultSet rs, int rowNum) throws SQLException {

            Post.PostBuilder postBuilder = Post.builder()
                    .postId(rs.getInt("post_id"))
                    .userId(rs.getInt("user_id"))
                    .publicId(rs.getString("public_id"))
                    .title(rs.getString("title"))
                    .captions(rs.getString("captions"))
                    .reactions(rs.getInt("reactions"))
                    .albumId((Integer) rs.getObject("album_id"))
                    .createdAt(rs.getTimestamp("created_at").toLocalDateTime());

            try {
                int hasInteracted = rs.getInt("has_interacted");
                postBuilder.hasInteracted(hasInteracted == 1);
            } catch (SQLException e) {
                // If the column does not exist, we can simply ignore this
                // or log it if needed
                postBuilder.hasInteracted(null); // Set to null or handle as appropriate
            }

            return postBuilder.build();
        }
    }
}
