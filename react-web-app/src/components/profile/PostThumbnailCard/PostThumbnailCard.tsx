import "./PostThumbnailCard.css"

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { Card } from 'react-bootstrap';

export default function ThumbnailCard({title, publicId}: {title: string, publicId: string})
{
    const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });

    const img = cld
    .image(publicId)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(300).height(300));

    return (
        <Card className="post-card">
            <AdvancedImage className="thumbnail-image" cldImg={img} />
            <Card.Body className="post-card-body">{title}</Card.Body>
        </Card>
    )
}