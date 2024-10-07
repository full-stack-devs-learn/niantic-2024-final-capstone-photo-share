import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { PhotoPost } from "../../models/photo-post";
import photoPostService from "../../services/photo-post-service";
import ThumbnailCard from "./ThumbnailCard";

export default function UserPhotosContainer()
{
    const [posts, setPosts] = useState<PhotoPost[]>([]);

    const { user } = useSelector((state: RootState) => state.authentication);

    useEffect(() => {
        photoPostService.getByUser(user?.id ?? 0).then(data => {
            setPosts(data);
        });
    }, []);

    return (
        <section>
            {
                posts.map((post) => (
                    <ThumbnailCard key={post.postId}
                        publicId={post.publicId}
                        ></ThumbnailCard>
                ))
            }
        </section>
    )
}