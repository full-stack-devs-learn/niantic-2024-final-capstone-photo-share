import "./AlbumDetails.css"
import "../../../index.css"
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AlbumAddPhotosModal from "../AlbumAddPhotosModal/AlbumAddPhotosModal";
import { PhotoPost } from "../../../models/photo-post";
import { Album } from "../../../models/album";
import photoPostService from "../../../services/photo-post-service";
import AlbumCarouselImage from "../AlbumCarouselImage";
import albumService from "../../../services/album-service";
import { Carousel, Card } from "react-bootstrap";

export default function AlbumDetails()
{
    const params = useParams();
    const albumId = params?.albumId ?? 0;

    const [refreshPage, setRefreshPage] = useState<number>(0);
    const [posts, setPosts] = useState<PhotoPost[]>([]);
    const [albumData, setAlbumData] = useState<Album>({albumId: 0, userId: 0, title: "", description: "", createdAt: ""});

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
            <Link className="breadcrumb" to={`/profile/${albumData.userId}`}>&lt; Go back to all albums</Link>
            <Card style={{ width: '500px' }} className="mt-5 mx-auto" id="custom-card">
                <Card.Header>{albumData.title}</Card.Header>
                <Carousel className="mx-auto" interval={null} style={{ width: '500px' }}>
                {
                    posts.map((post) => (
                        <Carousel.Item key={post.postId}><AlbumCarouselImage publicId={post.publicId} /></Carousel.Item>
                    ))
                }
                </Carousel>

                <Card.Body>
                    <p>{albumData.description}</p>
                    <AlbumAddPhotosModal albumId={+albumId} onAlbumUpdated={albumUpdated}/>
                </Card.Body>
            </Card>
        </section>
    )
}