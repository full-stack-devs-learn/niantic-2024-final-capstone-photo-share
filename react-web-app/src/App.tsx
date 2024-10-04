
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/shared/header/Header'
import Login from './components/authentication/login/Login'
import Register from './components/authentication/register/Register'
import { useState } from 'react'

// Cloudinary - Imports
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';

// Cloudinary - Import any actions required for transformations.
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';
import PhotoUploadButton from './components/PhotoUploadButton'

export default function App() {
    const [uploadedImg, setUploadedImg] = useState<CloudinaryImage>();

    const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });

    function showUploadedPhoto(public_id: string)
    {
        const img = cld
        .image(public_id)
        .format("auto")
        .quality("auto")
        .resize(auto().gravity(autoGravity()).width(500).height(500));

        setUploadedImg(img);
    }

    return (
        <Router>
        <Header />

        <main className="container mt-4">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            </Routes>

            {/* Rendering the image in a React component. */}
            {uploadedImg && <AdvancedImage cldImg={uploadedImg} />}
        </main>

        <PhotoUploadButton onPhotoUploaded={showUploadedPhoto}></PhotoUploadButton>
        </Router>
    );
}