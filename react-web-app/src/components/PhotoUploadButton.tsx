import cloudinaryApiService from "../services/cloudinary-api-service";
import { useState } from "react";

export default function PhotoUploadButton({onPhotoUploaded}: {onPhotoUploaded: Function})
{
    const [file, setFile] = useState<File>();
    const [message, setMessage] = useState("");

    async function submitHandler(event: any) {
        event.preventDefault();
    
        try
        {
            if (file) 
            {
                const formData = new FormData();
    
                formData.append(
                    "upload_preset",
                    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
                );
    
                formData.append("file", file);
    
                const response = await cloudinaryApiService.uploadPhoto(formData);
                setMessage("Successfully uploaded photo!");
                onPhotoUploaded(response.public_id);
            }
        }
        catch (e)
        {
            console.error(e);
            setMessage("There was an error in uploading your photo.");
        }
    }
    
    return (
        <>
        <form onSubmit={submitHandler}>
            <input
            type="file"
            onChange={(e) => {
                setFile(e.target.files![0]);
            }}
            ></input>
            <button type="submit">Submit</button>
            <p>{message}</p>
        </form>
        </>
    )
}