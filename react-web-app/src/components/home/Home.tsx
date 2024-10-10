import { useState } from "react";
import PostCreationModal from "../photo-post/PhotoPostAddModal/PhotoPostAddModal";
import PhotoPostFeed from '../photo-post/PhotoPostFeed/PhotoPostFeed'
import "./home.css"

export default function Home()
{
    const [newPost, setNewPost] = useState<string>("");

    return (
        <>
         <main className="container mt-5" id = "home-page-container">
            <PostCreationModal onNewPostCreated={(public_id: string) => setNewPost(public_id)}></PostCreationModal>
            <PhotoPostFeed onNewPostCreated={newPost}></PhotoPostFeed>
        </main>  
        </>
    )
}