import photoPostService from "../../services/photo-post-service";
import { useState, useEffect } from 'react';
import PhotoPostCard from "./PhotoPostCard";
import { PhotoPost } from "../../models/photo-post";
import { Button } from "react-bootstrap";

export default function PhotoPostFeed({onNewPostCreated}: {onNewPostCreated: any})
{
    const [posts, setPosts] = useState<PhotoPost[]>([]);
    const [pageNum, setPageNum] = useState<number>(1);

    useEffect(() => {
        photoPostService.getAllPosts(pageNum).then(data => {
            setPosts(data);
        })
    }, [onNewPostCreated, pageNum]);

    const handleNextPage = () => setPageNum(pageNum + 1);
    const handlePrevPage = () => setPageNum(pageNum - 1);

    return (
        <>
        {
            posts.map((post) => (
                <PhotoPostCard key={post.postId}
                userId={post.userId}
                publicId={post.publicId}
                title={post.title}
                captions={post.captions}
                reactions={post.reactions}
                ></PhotoPostCard>
            ))
        }

        {pageNum !== 1 && <Button onClick={handlePrevPage}>Prev</Button>}

        <Button onClick={handleNextPage}>Next</Button>
        </>
    )
}