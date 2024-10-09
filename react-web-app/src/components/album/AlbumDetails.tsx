import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AlbumAddPhotos from "./AlbumAddPhotos";
import { PhotoPost } from "../../models/photo-post";
import { Album } from "../../models/album";
import photoPostService from "../../services/photo-post-service";
import AlbumCarouselImage from "./AlbumCarouselImage";
import albumService from "../../services/album-service";
import { Carousel } from "react-bootstrap";

export default function AlbumDetails()
{
    const params = useParams();
    const albumId = params?.albumId ?? 0;

    const [refreshPage, setRefreshPage] = useState<number>(0);
    const [posts, setPosts] = useState<PhotoPost[]>([]);
    const [albumData, setAlbumData] = useState<Album>({albumId: 0, userId: 0, title: "", description: "", createdAt: ""});

    // For Carousel
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: any) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        photoPostService.getByAlbum(+albumId).then(data => {
            setPosts(data);
        })
    }, [refreshPage]);

    useEffect(() => {
        albumService.getById(+albumId).then(data => {
            setAlbumData(data);
        })
    }, []);

    async function albumUpdated(postId: number)
    {
        setRefreshPage(postId)
    }

    return (
        <section className="container mt-4">
            <Link to={`/profile/${albumData.userId}`}><p>Go back to all albums</p></Link>
            <AlbumAddPhotos albumId={+albumId} onAlbumUpdated={albumUpdated}/>
            <Carousel activeIndex={index} onSelect={handleSelect} style={{ width: '500px' }}>
            {
                posts.map((post) => (
                    <Carousel.Item><AlbumCarouselImage publicId={post.publicId} /></Carousel.Item>
                ))
            }
            </Carousel>

            <div>
                <p>{albumData.title}</p>
                <p>{albumData.description}</p>
            </div>
        </section>
    )
}