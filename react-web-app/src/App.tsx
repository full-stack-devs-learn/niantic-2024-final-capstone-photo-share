
import './App.css'
import axios from 'axios';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/shared/header/Header'
import Login from './components/authentication/login/Login'
import Register from './components/authentication/register/Register'

// Cloudinary - Imports
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

// Cloudinary - Import any actions required for transformations.
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';

export default function App() {

  const [file, setFile] = useState<File>();

  // SECTION 1
  // This demonstrates how images can be pulled from the Cloudinary cloud storage.

  // Keep cloudName as-is.
  const cld = new Cloudinary({ cloud: { cloudName: 'dfcgemeg1' } });
  
  // Instantiate a CloudinaryImage object for the image with the public ID
  const img = cld
        .image('cld-sample-4')
        // Applying transformations
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  // SECTION 2
  // This demonstrates how images can be uploaded to the Cloudinary cloud storage.

  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dfcgemeg1");
  const [uploadPreset] = useState("ml_default");

  // We can uncomment these to add additional functionality to uploading.
  const [uwConfig] = useState({
    cloudName,
    uploadPreset
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

    // Create a Cloudinary instance and set your cloud name.
    const cld2 = new Cloudinary({
      cloud: {
        cloudName
      }
    });
  
    const myImage = cld2.image(publicId);

    const url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;

    async function submitHandler(event: any)
    {
      event.preventDefault();

      if(file)
      {
        const formData = new FormData();
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formData.append("file", file);
  
        const response = await axios.post(url, formData);
      }
    }

  return (
    <Router>
      <Header />

      <main className="container mt-4">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

      {/* Rendering the image in a React component. */}
      <AdvancedImage cldImg={img}/>
      </main>

          <div className="App">
      <h3>Cloudinary Upload Widget Example</h3>
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
      <p>
        <a
          href="https://cloudinary.com/documentation/upload_widget"
          target="_blank"
        >
          Upload Widget User Guide
        </a>
      </p>
      <p>
        <a
          href="https://cloudinary.com/documentation/upload_widget_reference"
          target="_blank"
        >
          Upload Widget Reference
        </a>
      </p>
      <div style={{ width: "800px" }}>
        <AdvancedImage
          style={{ maxWidth: "100%" }}
          cldImg={myImage}
          plugins={[responsive(), placeholder()]}
        />
      </div>
    </div>

    <form onSubmit={submitHandler}>
      <input type="file" onChange={(e) => {setFile(e.target.files![0])}}></input>
      <button type="submit">Submit</button>
    </form>

      <footer>
        &copy; Sakila Movies 2024
      </footer>

    </Router>
  )
}