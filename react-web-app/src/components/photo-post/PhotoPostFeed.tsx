import photoPostService from "../../services/photo-post-service";
import { useState, useEffect } from 'react';
import PhotoPostCard from "./PhotoPostCard";
import { PhotoPost } from "../../models/photo-post";

export default function PhotoPostFeed({onNewPostCreated}: {onNewPostCreated: any})
{
    const [posts, setPosts] = useState<PhotoPost[]>([]);

    useEffect(() => {
        photoPostService.getAllPosts().then(data => {
            setPosts(data);
        })
    }, [onNewPostCreated]);

    return (
        <>
        {
            posts.map((post) => (
                <PhotoPostCard key={post.postId}
                userId={post.userId}
                imgUrl={post.imgUrl}
                title={post.title}
                captions={post.captions}
                reactions={post.reactions}
                ></PhotoPostCard>
            ))
        }
        </>
    )
}