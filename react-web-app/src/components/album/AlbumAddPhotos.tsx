import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import photoPostService from "../../services/photo-post-service";
import { PhotoPost } from "../../models/photo-post";
import SmallThumbnail from "./SmallThumbnail";
import { Button } from "react-bootstrap";

export default function AlbumAddPhotos() {
    const [posts, setPosts] = useState<PhotoPost[]>([]);
    const { user } = useSelector((state: RootState) => state.authentication);

    function submitHandler(event: any)
    {
        event.preventDefault();
    }

    useEffect(() => {
        photoPostService.getByUser(user?.id ?? 0).then(data => {
            setPosts(data);
        })
    }, [user?.id]);

    return (
        <form onSubmit={submitHandler}>
            {
                posts.map((post) => (
                    <>
                    <input type="checkbox" id={`checkbox-${post.postId}`}/>
                    <label htmlFor={`checkbox-${post.postId}`}>
                        <SmallThumbnail publicId={post.publicId} />
                    </label>
                    </>
                ))
            }
            <Button type="submit">Add photos to album</Button>
        </form>
    )
}