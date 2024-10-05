import photoPostService from "../../services/photo-post-service";
import { useState, useEffect } from 'react';
import PhotoPost from "./PhotoPost";

export default function PhotoPostFeed()
{
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        photoPostService.getAllPosts().then(data => {
            setPosts(data);
        })
    }, []);

    return (
        <>
        {
            posts.map((post) => (
                <PhotoPost imgUrl={post.imgUrl}
                title={post.title}
                captions={post.captions}
                reactions={post.reactions}
                ></PhotoPost>
            ))
        }
        </>
    )
}