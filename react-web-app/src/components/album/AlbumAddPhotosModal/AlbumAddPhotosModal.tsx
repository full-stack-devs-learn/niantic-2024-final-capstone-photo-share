import './AlbumAddPhotosModal.css';

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import photoPostService from "../../../services/photo-post-service";
import { PhotoPost } from "../../../models/photo-post";
import SmallThumbnail from "../SmallThumbnail";
import { Button, Modal } from "react-bootstrap";

export default function AlbumAddPhotosModal({albumId, onAlbumUpdated}: {albumId: number, onAlbumUpdated: any}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [posts, setPosts] = useState<PhotoPost[]>([]);

    const [checked, setChecked] = useState<number[]>([]);
    const { user } = useSelector((state: RootState) => state.authentication);

    async function submitHandler(event: any)
    {
        event.preventDefault();

        for(let checkedItem of checked)
        {
            await updatePost(checkedItem)
        }

        setShow(false);
        onAlbumUpdated(checked[0]);
    }

    async function updatePost(checkedItem: number)
    {
        const data = await photoPostService.getById(checkedItem)
        const updatedPost = {
            publicId: data.publicId,
            title: data.title,
            captions: data.captions,
            albumId: albumId
        }
        await photoPostService.update(data.postId, updatedPost);
    }

    const handleCheck = (event: any) => {
        let updatedList: number[] = [...checked];
        if(event.target.checked) {
            updatedList = [...checked, event.target.value];
        }
        else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    }

    useEffect(() => {
        photoPostService.getByUser(user?.id ?? 0).then(data => {
            setPosts(data);
        })
    }, [user?.id]);

    return (
        <>
        <div className="edit-button" >
            <Button variant="light" onClick={handleShow}>
            Edit photos for album
            </Button>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit photos for album</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={submitHandler}>
                    <div className="formContainer">
                    {
                        posts.map((post) => (
                            <div key={post.postId}>
                                <input type="checkbox" value={post.postId} id={`checkbox-${post.postId}`} onChange={handleCheck}/>
                                <label htmlFor={`checkbox-${post.postId}`}>
                                    <SmallThumbnail publicId={post.publicId} />
                                </label>
                            </div>
                        ))
                    }
                    </div>
                    <p className="mt-4">{checked.length} selected</p>
                    <Button type="submit">Add photos to album</Button>
                </form>
            </Modal.Body>
        </Modal>
        </>
    )
}