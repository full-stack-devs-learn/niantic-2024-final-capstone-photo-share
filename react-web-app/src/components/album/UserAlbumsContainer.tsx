import { useState, useEffect } from "react";
import { Album } from "../../models/album";
import albumService from "../../services/album-service";
import ThumbnailCard from "../profile/ThumbnailCard";
import AlbumAdd from "./AlbumAddModal";
import AlbumAddPhotos from "./AlbumAddPhotos";

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
        <AlbumAdd />
        <AlbumAddPhotos />
        <section className="d-flex">
            {
                albums.map((album) => (
                    <ThumbnailCard key={album.albumId}
                        publicId={"cld-sample-5"}
                        title={album.title}
                        ></ThumbnailCard>
                ))
            }
        </section>
        </>
    )
}