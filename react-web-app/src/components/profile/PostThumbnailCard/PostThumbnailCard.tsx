import "./PostThumbnailCard.css"

import { useState } from "react";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { Card, Modal } from 'react-bootstrap';
import { useParams } from "react-router-dom";

export default function ThumbnailCard({title, publicId}: {title: string, publicId: string})
{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const params = useParams();
    const postId = params?.postId ?? 0;

    const showPost = () =>
    {
        if(postId !== 0)
        {
            setShow(true);
            console.log(postId);
        }
    }
    
    const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });

    const img = cld
    .image(publicId)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(300).height(300));

    return (
        <>
        <Card className="post-card" onClick={handleShow}>
            <AdvancedImage className="thumbnail-image" cldImg={img} />
            <Card.Body className="post-card-body">{title}</Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose}>
        <Modal.Body>Yay</Modal.Body>
        </Modal>
        </>
    )
}