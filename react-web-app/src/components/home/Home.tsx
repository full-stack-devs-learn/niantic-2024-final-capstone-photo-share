import { useState } from "react";
import demoService from "../../services/demo-service"
import PostCreationModal from "../photo-post/PhotoPostAddModal";
import PhotoPostFeed from '../photo-post/PhotoPostFeed'
import "./home.css"

export default function Home()
{
    const [data, setData] = useState<any>('');
    const [newPost, setNewPost] = useState<string>("");

    async function simpleClickHandler()
    {
        const result = await demoService.getDemo()
        console.log(result);
        setData(result)
    }

    return (
        <>
         <main className="container mt-4" id = "home-page-container">
        <PostCreationModal onNewPostCreated={(public_id: string) => setNewPost(public_id)}></PostCreationModal>
        <PhotoPostFeed onNewPostCreated={newPost}></PhotoPostFeed>
        </main>  
        </>
    )
}