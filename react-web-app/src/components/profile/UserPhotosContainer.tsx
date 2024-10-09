import { useState, useEffect } from "react";

import { PhotoPost } from "../../models/photo-post";
import photoPostService from "../../services/photo-post-service";
import PostThumbnailCard from "./PostThumbnailCard";

export default function UserPhotosContainer({profileId}: {profileId: number})
{
    const [posts, setPosts] = useState<PhotoPost[]>([]);

    useEffect(() => {
        photoPostService.getByUser(profileId).then(data => {
            setPosts(data);
        });
    }, [profileId]);

    return (
        // Perhaps grid would be easier with 3 fr width and some gap
        <section className="d-flex">
            {
                posts.map((post) => (
                    <PostThumbnailCard key={post.postId}
                        publicId={post.publicId}
                        title={post.title}
                        ></PostThumbnailCard>
                ))
            }
        </section>
    )
}