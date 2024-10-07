import axios from "axios";

class PhotoPostService
{
    baseUrl = 'http://localhost:8080/posts';

    async getAllPosts(pageNum: number)
    {
        const response = await axios.get(this.baseUrl + `?size=10&page=${pageNum}`);
        return response.data;
    }

    async getById(postId: number)
    {
        const response = await axios.get(this.baseUrl + `/${postId}`);
        return response.data;
    }

    async getByUser(userId: number)
    {
        const response = await axios.get(this.baseUrl + `/profile/${userId}`);
        return response.data;
    }

    async add(post: any)
    {
        const response = await axios.post(this.baseUrl, post);
        return response.data;
    }
}

export default new PhotoPostService();