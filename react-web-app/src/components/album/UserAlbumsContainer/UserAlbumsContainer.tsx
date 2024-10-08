import "../../../index.css";
import "./UserAlbumsContainer.css"

import { useState, useEffect } from "react";
import { Album } from "../../../models/album";
import albumService from "../../../services/album-service";
import AlbumThumbnailCard from "../AlbumThumbnailCard/AlbumThumbnailCard";
import AlbumAddModal from "../AlbumAddModal/AlbumAddModal";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function UserAlbumsContainer({profileId}: {profileId: number})
{
    const [albums, setAlbums] = useState<Album[]>([]);
    const [refreshPage, setRefreshPage] = useState<number>(0);

    const { user } = useSelector((state: RootState) => state.authentication);

    useEffect(() => {
        albumService.getByProfile(profileId).then(data => {
            setAlbums(data);
        });
    }, [profileId, refreshPage]);

    async function albumAdded(albumId: number)
    {
        setRefreshPage(albumId)
    }

    return (
        <>
        {user?.id == profileId && <AlbumAddModal onAlbumAdded={albumAdded}/>}
        <section id="album-container" className="mt-5">
            {
                albums.map((album) => (
                    <Link to={`/albums/${album.albumId}`} className="link">
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