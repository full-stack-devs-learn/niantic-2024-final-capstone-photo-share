import axios from "axios";

class AlbumService
{
    baseUrl = "http://localhost:8080/albums";

    async getById(albumId: number)
    {
        const response = await axios.get(this.baseUrl + `/${albumId}`);
        return response.data;
    }

    async getByProfile(profileId: number)
    {
        const response = await axios.get(this.baseUrl + `/profile/${profileId}`);
        return response.data;
    }

    async add(album: any)
    {
        const response = await axios.post(this.baseUrl, album);
        return response.data;
    }
}

export default new AlbumService();