import "../../index.css";

import { useState, useEffect } from "react";
import { Album } from "../../models/album";
import albumService from "../../services/album-service";
import ThumbnailCard from "../profile/ThumbnailCard";
import AlbumAddModal from "./AlbumAddModal";
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
        <section className="d-flex">
            {
                albums.map((album) => (
                    <Link to={`/albums/${album.albumId}`}>
                        <ThumbnailCard key={album.albumId}
                        publicId={"cld-sample-5"}
                        title={album.title}
                        ></ThumbnailCard>
                    </Link>
                ))
            }
        </section>
        </>
    )
}