import axios from "axios";

class PhotoPostService
{
    baseUrl = 'http://localhost:8080/post';

    async getAllPosts()
    {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }

    async getById(postId: string)
    {
        const response = await axios.get(this.baseUrl + `/${postId}`);
        return response.data;
    }
}

export default new PhotoPostService();