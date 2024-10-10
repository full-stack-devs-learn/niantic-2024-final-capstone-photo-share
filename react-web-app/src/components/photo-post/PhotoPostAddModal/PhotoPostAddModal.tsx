import "./PhotoPostAddModal.css"

import { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Button, Modal } from 'react-bootstrap';
import PhotoUploadButton from '../../PhotoUploadButton';
import photoPostService from '../../../services/photo-post-service';

// Cloudinary - Imports
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

// Cloudinary - Import any actions required for transformations.
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

export default function PostCreationModal({onNewPostCreated}: {onNewPostCreated: any}) {
    // Bootstrap stuff
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setUploadedImg(undefined);
    }

    const [uploadedImg, setUploadedImg] = useState<CloudinaryImage>();
    const [publicId, setPublicId] = useState("");
    const [title, setTitle] = useState("");
    const [captions, setCaptions] = useState("");

    const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });

    const { user, isAuthenticated } = useSelector((state: RootState) => state.authentication);

    function showUploadedPhoto(public_id: string)
    {
        const img = cld
        .image(public_id)
        .format("auto")
        .quality("auto")
        .resize(auto().gravity(autoGravity()).width(300).height(300))
        .roundCorners(byRadius(17));

        setUploadedImg(img);
        setPublicId(public_id);
    }

    async function submitHandler(event: any)
    {
        event.preventDefault();

        const newPhotoPost = {
            userId: user?.id,
            publicId: publicId,
            title: title,
            captions: captions
        }

        await photoPostService.add(newPhotoPost).then(handleClose)
        onNewPostCreated(publicId);
    }

    return (
        <>
        {isAuthenticated && <button id="add-post-button"onClick={handleShow}>
            <span className="material-symbols-outlined">add_circle</span>
            Create new photo post 
        </button>}
        

        <Modal id="add-post-modal" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create a new post</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <PhotoUploadButton onPhotoUploaded={showUploadedPhoto}></PhotoUploadButton>
                    {uploadedImg && <div className="center-modal-items mb-5"><AdvancedImage cldImg={uploadedImg} /></div>}
                    <hr></hr>
                <form onSubmit={submitHandler}>
                    <label className="form-label" htmlFor="title">Title</label>
                    <input className="form-control" type="text" maxLength={25} name="title" id="title" placeholder="Give your photo a title" onChange={(e) => setTitle(e.target.value)} required></input>

                    <label className="form-label mt-3" htmlFor="caption">Caption</label>
                    <textarea className="form-control" maxLength={100} name="caption" id="caption" placeholder="Type a caption (optional)" onChange={(e) => setCaptions(e.target.value)}></textarea>

                    <div className="center-modal-items"><Button variant="primary mt-4" type="submit">Create post</Button></div>
                </form>
            </Modal.Body>
        </Modal>
        </>
    );
}