import { useState } from "react";
import demoService from "../../services/demo-service"
import PostCreationModal from "../post-creation-modal/PostCreationModal";
import PhotoPostFeed from '../photo-post/PhotoPostFeed'

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
        <h1>
            Home
        </h1>

        <button onClick={simpleClickHandler}>Simple Authenticated Demo</button>

        <div>
            {data}
        </div>

        <PostCreationModal onNewPostCreated={(public_id: string) => setNewPost(public_id)}></PostCreationModal>
        <PhotoPostFeed onNewPostCreated={newPost}></PhotoPostFeed>

        </>
    )
}