package com.niantic.repositories;

import com.niantic.models.Album;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MySqlAlbumDao implements AlbumDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlAlbumDao(DataSource dataSource)
    {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Album> getAllAlbums()
    {
        String sql = """
                SELECT
                    *
                FROM
                    albums
                """;

        List<Album> results = jdbcTemplate.query(
                sql,
                new AlbumRowMapper()
        );

        List<Album> albums = results.isEmpty()
                ? null
                : results;

        return albums;
    }

    public List<Album> getAllAlbumsByUserId(int userId)
    {
        String sql = """
                SELECT
                    *
                FROM
                    albums
                WHERE
                    user_id = ?
                """;

        List<Album> result = jdbcTemplate.query(sql,
                new Object[]{userId},
                new AlbumRowMapper()
        );

        List<Album> albums = result.isEmpty()
                ? null
                : result;

        return albums;
    }

    public Album getAlbum(int albumId)
    {
        String sql = """
                SELECT
                    *
                FROM
                    albums
                WHERE
                    album_id = ?
                """;

        List<Album> result = jdbcTemplate.query(
                sql,
                new Object[]{albumId},
                new AlbumRowMapper()
        );

        Album album = result.isEmpty()
                ? null
                : result.getFirst();

        return album;
    }

    public Album addAlbum(Album album)
    {
        String sql = """
               INSERT INTO
                    albums
                    (user_id, title, description)
               VALUES
                    (?, ?, ?)
               """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            statement.setInt(1, album.getUserId());
            statement.setString(2, album.getTitle());
            statement.setString(3, album.getDescription());

            return statement;
        }, keyHolder);

        int newId = keyHolder.getKey().intValue();

        return getAlbum(newId);
    }

    public boolean updateAlbum(int albumId, Album album)
    {
        try
        {
            List<Object> sqlColumns = new ArrayList<>();
            StringBuilder sql = new StringBuilder("Update albums SET ");

            if (album.getTitle() != null) {
                sql.append("public_id = ?, ");
                sqlColumns.add(album.getTitle());
            }
            if (album.getDescription() != null) {
                sql.append("description = ?, ");
                sqlColumns.add(album.getDescription());
            }

            sql.setLength(sql.length() - 2);
            sql.append(" WHERE album_id = ?;");
            sqlColumns.add(albumId);

            jdbcTemplate.update(sql.toString(), sqlColumns.toArray());
            return true;
        }
        catch(Exception e)
        {
            return false;
        }
    }

    public boolean deleteAlbum(int albumId) {

        var albumToDelete = getAlbum(albumId);
        if(albumToDelete == null){
            return false;
        }

        String sql = """
                DELETE FROM albums
                WHERE album_id = ?
                """;

        jdbcTemplate.update(sql, albumId);
        return true;
    }

    public static class AlbumRowMapper implements RowMapper<Album>
    {

        @Override
        public Album mapRow(ResultSet rs, int rowNum) throws SQLException {

            Album album = new Album(
                    rs.getInt("album_id"),
                    rs.getInt("user_id"),
                    rs.getString("title"),
                    rs.getString("description"),
                    rs.getTimestamp("created_at").toLocalDateTime()
            );

            return album;
        }
    }

}
