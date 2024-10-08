import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import photoPostService from "../../services/photo-post-service";
import { PhotoPost } from "../../models/photo-post";
import SmallThumbnail from "./SmallThumbnail";
import { Button, Modal } from "react-bootstrap";

export default function AlbumAddPhotos({albumId, onAlbumUpdated}: {albumId: number, onAlbumUpdated: any}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [posts, setPosts] = useState<PhotoPost[]>([]);

    const [checked, setChecked] = useState<number[]>([]);
    const { user } = useSelector((state: RootState) => state.authentication);

    async function submitHandler(event: any)
    {
        event.preventDefault();

        checked.forEach(checkedItem => {
            updatePost(checkedItem)
        })

        onAlbumUpdated(checked[0]);
    }

    async function updatePost(checkedItem: number)
    {
        await photoPostService.getById(checkedItem).then(data => {
            const updatedPost = {
                publicId: data.publicId,
                title: data.title,
                captions: data.captions,
                albumId: albumId
            }
            photoPostService.update(data.postId, updatedPost);
        }).then(handleClose);
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
        <Button variant="primary" onClick={handleShow}>
        Select photos for album
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Select photos for album</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={submitHandler}>
                    {
                        posts.map((post) => (
                            <>
                            <input type="checkbox" value={post.postId} id={`checkbox-${post.postId}`} onChange={handleCheck}/>
                            <label htmlFor={`checkbox-${post.postId}`}>
                                <SmallThumbnail publicId={post.publicId} />
                            </label>
                            </>
                        ))
                    }
                    <Button type="submit">Add photos to album</Button>
                </form>
            </Modal.Body>
        </Modal>
        </>
    )
}