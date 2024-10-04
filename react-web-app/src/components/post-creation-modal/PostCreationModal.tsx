import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PhotoUploadButton from '../PhotoUploadButton';

// Cloudinary - Imports
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

// Cloudinary - Import any actions required for transformations.
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';

export default function PostCreationModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [uploadedImg, setUploadedImg] = useState<CloudinaryImage>();

  const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });

  function showUploadedPhoto(public_id: string)
  {
      const img = cld
      .image(public_id)
      .format("auto")
      .quality("auto")
      .resize(auto().gravity(autoGravity()).width(300).height(300));

      setUploadedImg(img);
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
            <label htmlFor="caption">Caption</label>
            <textarea maxLength={100} name="caption" id="caption" placeholder="Type a caption (optional)"></textarea>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}