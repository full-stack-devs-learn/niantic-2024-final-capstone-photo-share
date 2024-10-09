import { Button } from "react-bootstrap";
import UserPhotosContainer from "./UserPhotosContainer";
import UserProfileContainer from "./UserProfileContainer";

import { useParams, Link } from "react-router-dom";
import UserAlbumsContainer from "../album/UserAlbumsContainer/UserAlbumsContainer";

export default function ProfilePage()
{
    const params = useParams();
    const profileId = params?.profileId ?? 0;
    const profileSection = window.location.pathname.split('/')[3];

    return (
        <div className="container mb-5">
            <UserProfileContainer profileId={+profileId}/>

            <Link to={`/profile/${profileId}`}>
                <Button>Posts</Button>
            </Link>
            <Link to={`/profile/${profileId}/albums`}>
                <Button>Albums</Button>
            </Link>
            
            {profileSection == "albums" ? 
                <UserAlbumsContainer profileId={+profileId}/> :
                <UserPhotosContainer profileId={+profileId}/>}
        </div>
    )
}