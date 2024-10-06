import { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PhotoUploadButton from '../PhotoUploadButton';

// Cloudinary - Imports
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

// Cloudinary - Import any actions required for transformations.
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';
import photoPostService from '../../services/photo-post-service';

export default function PostCreationModal({onNewPostCreated}: {onNewPostCreated: any}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [uploadedImg, setUploadedImg] = useState<CloudinaryImage>();
    const [publicId, setPublicId] = useState("");
    const [title, setTitle] = useState("");
    const [captions, setCaptions] = useState("");

    const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });
    const { user } = useSelector((state: RootState) => state.authentication)

    function showUploadedPhoto(public_id: string)
    {
        const img = cld
        .image(public_id)
        .format("auto")
        .quality("auto")
        .resize(auto().gravity(autoGravity()).width(300).height(300));

        setUploadedImg(img);
        setPublicId(public_id);
    }

    async function submitHandler(event: any)
    {
        event.preventDefault();

        const newPhotoPost = {
            userId: user?.id,
            imgUrl: publicId,
            title: title,
            captions: captions
        }

        await photoPostService.add(newPhotoPost).then(handleClose)
        onNewPostCreated(publicId);
        setUploadedImg(undefined);
    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Create new post
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create a new post</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <PhotoUploadButton onPhotoUploaded={showUploadedPhoto}></PhotoUploadButton>
                    {uploadedImg && <AdvancedImage cldImg={uploadedImg} />}
                    <hr></hr>
                <form onSubmit={submitHandler}>
                    <label htmlFor="title">Title</label>
                    <input type="text" maxLength={25} name="title" id="title" placeholder="Give your photo a title" onChange={(e) => setTitle(e.target.value)} required></input>

                    <label htmlFor="caption">Caption</label>
                    <textarea maxLength={100} name="caption" id="caption" placeholder="Type a caption (optional)" onChange={(e) => setCaptions(e.target.value)}></textarea>

                    <Button variant="primary" type="submit">Create</Button>
                </form>
            </Modal.Body>
        </Modal>
        </>
    );
}