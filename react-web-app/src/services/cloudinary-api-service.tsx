import axios from 'axios';

class CloudinaryApiService
{
    uploadUrl = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/upload`;

    async uploadPhoto(formData: FormData)
    {
        const response = await axios.post(this.uploadUrl, formData);
        return response.data;
    }
}

export default new CloudinaryApiService();