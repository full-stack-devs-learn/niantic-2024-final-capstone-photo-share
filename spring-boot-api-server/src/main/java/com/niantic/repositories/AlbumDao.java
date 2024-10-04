package com.niantic.repositories;

import com.niantic.models.Album;
import com.niantic.models.Post;

import java.util.List;

public interface AlbumDao {

    List<Album> getAllAlbums();

    List<Album> getAllAlbumsByUserId(int userId);

    Album getAlbum(int albumId);

    Album addAlbum(Album album);

    void updateAlbum(int albumId, Album Album);

    void deleteAlbum(int albumId);

}
