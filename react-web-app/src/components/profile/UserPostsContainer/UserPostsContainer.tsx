import "./UserPostsContainer.css"

import { useState, useEffect } from "react";

import { PhotoPost } from "../../../models/photo-post";
import photoPostService from "../../../services/photo-post-service";
import PostThumbnailCard from "../PostThumbnailCard/PostThumbnailCard";
import { Modal } from "react-bootstrap";
import PhotoPostCard from "../../photo-post/PhotoPostCard/PhotoPostCard";

export default function UserPhotosContainer({profileId}: {profileId: number})
{
    const [posts, setPosts] = useState<PhotoPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<PhotoPost>();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function handleClick(postId: number)
    {
        setShow(true);
        setSelectedPost(posts.filter(post => post.postId == postId)[0]);
    }

    useEffect(() => {
        photoPostService.getByUser(profileId).then(data => {
            setPosts(data);
        });
    }, [profileId]);

    return (
        <section id="posts-container" className="mt-5">
            {
                posts.map((post) => (
                    <PostThumbnailCard key={post.postId}
                        postId={post.postId}
                        publicId={post.publicId}
                        title={post.title}
                        cardClicked={handleClick}
                        ></PostThumbnailCard>
                ))
            }

        {show == true &&
            <Modal className="mt-5 w-100" show={show} onHide={handleClose}>
                <Modal.Body className="mx-auto py-5">
                    <PhotoPostCard key={selectedPost!.postId}
                        userId={selectedPost!.userId}
                        postId={selectedPost!.postId}
                        publicId={selectedPost!.publicId}
                        title={selectedPost!.title}
                        captions={selectedPost!.captions}
                        reactions={selectedPost!.reactions}
                        hasInteracted={selectedPost!.hasInteracted}
                        ></PhotoPostCard>
                </Modal.Body>
            </Modal>}
        </section>
    )
}