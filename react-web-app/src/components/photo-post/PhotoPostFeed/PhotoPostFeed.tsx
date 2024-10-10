import "./PhotoPostFeed.css"

import photoPostService from "../../../services/photo-post-service";
import postInteractionService from "../../../services/post-interaction-service";
import { useState, useEffect } from 'react';
import PhotoPostCard from "../PhotoPostCard/PhotoPostCard";
import { PhotoPost } from "../../../models/photo-post";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function PhotoPostFeed({onNewPostCreated}: {onNewPostCreated: any})
{
    const { user, isAuthenticated } = useSelector((state: RootState) => state.authentication);
    const [posts, setPosts] = useState<PhotoPost[]>([]);
    const [pageNum, setPageNum] = useState<number>(1);

    useEffect(() => {
        if(isAuthenticated)
        {
            postInteractionService.getUserInteractions(pageNum, user?.id).then(data => {
                setPosts(data);
            })
        } 
        else 
        {
            photoPostService.getAllPosts(pageNum).then(data => {
                setPosts(data);
            })
        }
    }, [onNewPostCreated, pageNum, isAuthenticated]);

    const handleNextPage = () => setPageNum(pageNum + 1);
    const handlePrevPage = () => setPageNum(pageNum - 1);

    return (
        <>
        {
            posts.map((post) => (
                <PhotoPostCard key={post.postId}
                userId={post.userId}
                postId={post.postId}
                publicId={post.publicId}
                title={post.title}
                captions={post.captions}
                reactions={post.reactions}
                hasInteracted={post.hasInteracted}
                ></PhotoPostCard>
            ))
        }

        {pageNum !== 1 && <Button onClick={handlePrevPage}>Prev</Button>}

        <Button className="mb-5" onClick={handleNextPage}>Next</Button>
        </>
    )
}