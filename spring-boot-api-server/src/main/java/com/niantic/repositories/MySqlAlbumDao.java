package com.niantic.repositories;

import com.niantic.models.Album;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class MySqlAlbumDao implements AlbumDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlAlbumDao(DataSource dataSource)
    {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Album> getAllAlbums() {

        List<Album> albums = new ArrayList<>();

        String sql = """
                SELECT *
                FROM albums
                """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql);

        while(row.next())
        {
            int albumId = row.getInt("album_id");
            int userId = row.getInt("user_id");
            String title = row.getString("title");
            String description = row.getString("description");
            LocalDateTime createdAt = row.getTimestamp("created_at").toLocalDateTime();

            Album album = new Album(albumId, userId, title, description, createdAt);

            albums.add(album);
        }

        return albums;
    }

    public List<Album> getAllAlbumsByUserId(int userId)
    {
        List<Album> albums = new ArrayList<>();

        String sql = """
                SELECT *
                FROM albums
                WHERE user_id = ?
                """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql, userId);

        while(row.next())
        {
            int albumId = row.getInt("album_id");
            userId = row.getInt("user_id");
            String title = row.getString("title");
            String description = row.getString("description");
            LocalDateTime createdAt = row.getTimestamp("created_at").toLocalDateTime();

            Album album = new Album(albumId, userId, title, description, createdAt);

            albums.add(album);
        }

        return albums;
    }

    public Album getAlbum(int albumId)
    {
        String sql = """
                SELECT *
                FROM albums
                WHERE album_id = ?
                """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql, albumId);

        if (row.next())
        {
            albumId = row.getInt("album_id");
            int userId = row.getInt("user_id");
            String title = row.getString("title");
            String description = row.getString("description");
            LocalDateTime createdAt = row.getTimestamp("created_at").toLocalDateTime();

            Album album = new Album(albumId, userId, title, description, createdAt);

            return album;
        }
        return null;
    }

    public Album addAlbum(Album album)
    {
        String sql = """
               INSERT INTO albums (user_id, title, description)
               VALUES (?, ?, ?)
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
        var albumToUpdate = getAlbum(albumId);
        if(albumToUpdate == null)
        {
            return false;
        }
        String sql = """
                UPDATE albums
                SET
                    title = ?
                    description = ?
                WHERE
                    album_id = ?
                """;

        jdbcTemplate.update(sql,
                  album.getTitle()
                , album.getDescription()
                , albumId
                );
        return true;
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
}
