import { Card } from "react-bootstrap";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

interface PhotoPostProps {
    userId: number;
    publicId: string;
    title: string;
    captions: string;
    reactions: number;
}

export default function PhotoPostCard({userId, publicId, title, captions, reactions}: PhotoPostProps)
{
    const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });

    const img = cld
    .image(publicId)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(300).height(300));

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Header>{userId}</Card.Header>
            <AdvancedImage cldImg={img} />
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{captions}</Card.Text>
            <Card.Text>{reactions}<FontAwesomeIcon icon={faHeart} /></Card.Text>
            </Card.Body>
        </Card>
    )
}