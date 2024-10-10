import "./AlbumAddModal.css"

import { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Button, Modal } from "react-bootstrap"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import albumService from '../../../services/album-service';

export default function AlbumAddModal({onAlbumAdded}: {onAlbumAdded: any})
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

        const response = await albumService.add(newAlbum)
        onAlbumAdded(response.albumId);
        setShow(false);
    }

    return (
        <>
        <div id="add-button">
            <Button variant="primary" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} className="me-2"/>
                New album
            </Button>
        </div>

        <Modal show={show} onHide={handleClose} id="add-album-modal">
            <Modal.Header closeButton>
            <Modal.Title>Create a new album</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input className="form-control"
                            type="text"
                            maxLength={25} 
                            name="title" 
                            id="title" 
                            placeholder="Give your album a title" 
                            onChange={(e) => setTitle(e.target.value)} 
                            required></input>

                        <label className="mt-3 form-label" htmlFor="caption">Description &#40;optional&#41;</label>
                        <textarea className="form-control" 
                                maxLength={100} 
                                name="caption" id="caption" 
                                placeholder="Type a description (optional)" 
                                onChange={(e) => setDescription(e.target.value)}>
                                </textarea>
                    </div>

                    <Button variant="primary" type="submit">Create</Button>
                </form>
            </Modal.Body>
        </Modal>
        </>
    )
}