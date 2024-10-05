import { Card, Button } from "react-bootstrap";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';

interface PhotoPostProps {
    imgUrl: string;
    title: string;
    captions: string;
    reactions: number;
}

export default function PhotoPost({imgUrl, title, captions, reactions}: PhotoPostProps)
{
    const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });

    const img = cld
    .image(imgUrl)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(300).height(300));

    return (
        <Card style={{ width: '18rem' }}>
            <AdvancedImage cldImg={img} />
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{captions}</Card.Text>
            <Card.Text>{reactions}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}