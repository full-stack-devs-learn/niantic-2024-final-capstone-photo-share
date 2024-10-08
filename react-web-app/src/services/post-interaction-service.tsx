import axios from "axios";

class PhotoInteractionService
{
    baseUrl = 'http://localhost:8080/posts';

    async getUserInteractions(pageNum: number, userId: number|undefined)
    {
        if(userId == undefined){ return }
        const response = await axios.get(this.baseUrl+`?size=10&page=${pageNum}&userId=${userId}`)
        return response.data
    }

}
export default new PhotoInteractionService();