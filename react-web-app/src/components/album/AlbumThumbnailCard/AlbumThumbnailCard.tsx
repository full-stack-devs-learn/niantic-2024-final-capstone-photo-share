import "../../../index.css"
import "./AlbumThumbnailCard.css"

import { useEffect, useState } from 'react';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { Card } from 'react-bootstrap';
import photoPostService from '../../../services/photo-post-service';

export default function AlbumThumbnailCard({title, albumId}: {title: string, albumId: number})
{
    const [thumbnail, setThumbnail] = useState("");

    useEffect(() => {
        photoPostService.getThumbnail(albumId).then(data => {
            setThumbnail(data.publicId);
        })
    },[])

    if(thumbnail == "")
    {
        setThumbnail("opjdllqaev0lamn783gr");
    }

    const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });

    const img = cld
    .image(thumbnail)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(300).height(300));

    return (
        <Card className="album-card">
            <AdvancedImage className="thumbnail-image" cldImg={img} />
            <Card.Body className="album-thumbnail-card-body">{title}</Card.Body>
        </Card>
    )
}