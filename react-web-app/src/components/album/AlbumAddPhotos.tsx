import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import photoPostService from "../../services/photo-post-service";
import { PhotoPost } from "../../models/photo-post";
import SmallThumbnail from "./SmallThumbnail";
import { Button, Modal } from "react-bootstrap";

export default function AlbumAddPhotos({albumId}: {albumId: number}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [posts, setPosts] = useState<PhotoPost[]>([]);
    const [checked, setChecked] = useState<string[]>([]);
    const { user } = useSelector((state: RootState) => state.authentication);

    function submitHandler(event: any)
    {
        event.preventDefault();
    }

    const handleCheck = (event: any) => {
        let updatedList: string[] = [...checked];
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
            Add photos to album
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create a new post</Modal.Title>
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
                <p>{checked}</p>
            </Modal.Body>
        </Modal>
        </>
    )
}