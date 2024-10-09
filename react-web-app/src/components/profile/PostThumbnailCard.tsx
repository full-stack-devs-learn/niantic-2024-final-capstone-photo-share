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
        <Card style={{ width: '18rem' }}>
            <AdvancedImage cldImg={img} />
            <p>{title}</p>
        </Card>
    )
}