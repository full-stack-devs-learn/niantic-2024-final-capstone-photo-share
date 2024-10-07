import { useState, useEffect } from "react";

import { PhotoPost } from "../../models/photo-post";
import photoPostService from "../../services/photo-post-service";
import ThumbnailCard from "./ThumbnailCard";

export default function UserPhotosContainer({profileId}: {profileId: number})
{
    const [posts, setPosts] = useState<PhotoPost[]>([]);

    useEffect(() => {
        photoPostService.getByUser(profileId).then(data => {
            setPosts(data);
        });
    }, [profileId]);

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