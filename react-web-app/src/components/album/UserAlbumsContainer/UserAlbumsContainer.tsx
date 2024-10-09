import "../../../index.css";
import "./UserAlbumsContainer.css"

import { useState, useEffect } from "react";
import { Album } from "../../../models/album";
import albumService from "../../../services/album-service";
import AlbumThumbnailCard from "../../profile/AlbumThumbnailCard";
import AlbumAddModal from "../AlbumAddModal";
import { Link } from "react-router-dom";

export default function UserAlbumsContainer({profileId}: {profileId: number})
{
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        albumService.getByProfile(profileId).then(data => {
            setAlbums(data);
        });
    }, [profileId]);

    return (
        <>
        <AlbumAddModal />
        <section id="album-container" className="mt-5">
            {
                albums.map((album) => (
                    <Link to={`/albums/${album.albumId}`}>
                        <AlbumThumbnailCard key={album.albumId}
                        albumId={album.albumId}
                        title={album.title}
                        ></AlbumThumbnailCard>
                    </Link>
                ))
            }
        </section>
        </>
    )
}