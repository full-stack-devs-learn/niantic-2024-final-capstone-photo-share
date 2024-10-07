import UserPhotosContainer from "./UserPhotosContainer";
import UserProfileContainer from "./UserProfileContainer";

import { useParams } from "react-router-dom";

export default function ProfilePage()
{
    const params = useParams();
    const profileId = params?.profileId ?? 0;

    return (
        <div className="container">
            <UserProfileContainer profileId={+profileId}/>
            <UserPhotosContainer profileId={+profileId}/>
        </div>
    )
}