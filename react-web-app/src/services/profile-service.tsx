import axios from "axios";

class ProfileService
{
    baseUrl = 'http://localhost:8080/profiles';

    async getById(profileId: number)
    {
        const response = await axios.get(this.baseUrl + `/${profileId}`);
        return response.data;
    }
}

export default new ProfileService();