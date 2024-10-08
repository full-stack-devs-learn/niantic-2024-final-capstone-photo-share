import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AlbumAddPhotos from "./AlbumAddPhotos";
import { PhotoPost } from "../../models/photo-post";
import photoPostService from "../../services/photo-post-service";
import { Carousel } from "react-bootstrap";
import AlbumCarouselImage from "./AlbumCarouselImage";
import albumService from "../../services/album-service";

export default function AlbumDetails()
{
    const params = useParams();
    const albumId = params?.albumId ?? 0;

    const [posts, setPosts] = useState<PhotoPost[]>([]);
    const [albumData, setAlbumData] = useState();

    useEffect(() => {
        photoPostService.getByAlbum(+albumId).then(data => {
            setPosts(data);
        })
    }, []);

    useEffect(() => {
        albumService.getById(+albumId).then(data => {
            setAlbumData(data);
        })
    })

    return (
        <section className="container mt-4">
            <AlbumAddPhotos albumId={+albumId}/>
            <Carousel>
            {
                posts.map((post) => (
                    <Carousel.Item><AlbumCarouselImage publicId={post.publicId} /></Carousel.Item>
                ))
            }
            </Carousel>

            <p>{}</p>
        </section>
    )
}