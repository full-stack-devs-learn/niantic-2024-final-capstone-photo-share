import { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Button, Modal } from "react-bootstrap"
import albumService from '../../services/album-service';

export default function AlbumAddModal()
{
    // Bootstrap stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { user } = useSelector((state: RootState) => state.authentication);

    async function submitHandler(event: any)
    {
        event.preventDefault();

        const newAlbum = {
            userId: user?.id,
            title: title,
            description: description
        }

        await albumService.add(newAlbum).then(handleClose);
    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Create new album
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create a new album</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={submitHandler}>
                    <label htmlFor="title">Title</label>
                    <input type="text" maxLength={25} name="title" id="title" placeholder="Give your album a title" onChange={(e) => setTitle(e.target.value)} required></input>

                    <label htmlFor="caption">Description</label>
                    <textarea maxLength={100} name="caption" id="caption" placeholder="Type a description (optional)" onChange={(e) => setDescription(e.target.value)}></textarea>

                    <Button variant="primary" type="submit">Create</Button>
                </form>
            </Modal.Body>
        </Modal>
        </>
    )
}