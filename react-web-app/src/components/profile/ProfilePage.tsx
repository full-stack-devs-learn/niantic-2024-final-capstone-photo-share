import UserPhotosContainer from "./UserPostsContainer/UserPostsContainer";
import UserProfileContainer from "./UserProfileContainer/UserProfileContainer";

import { useParams, Link } from "react-router-dom";
import UserAlbumsContainer from "../album/UserAlbumsContainer/UserAlbumsContainer";

export default function ProfilePage()
{
    const params = useParams();
    const profileId = params?.profileId ?? 0;
    const profileSection = window.location.pathname.split('/')[3];

    return (
        <div className="mb-5 container">
            <UserProfileContainer profileId={+profileId}/>

            <div className="mt-5">
                <Link className="btn btn-light me-3" to={`/profile/${profileId}`}>Posts</Link>
                <Link className="btn btn-light" to={`/profile/${profileId}/albums`}>Albums</Link>
            </div>
            
            {profileSection == "albums" ? 
                <UserAlbumsContainer profileId={+profileId}/> :
                <UserPhotosContainer profileId={+profileId}/>}
        </div>
    )
}