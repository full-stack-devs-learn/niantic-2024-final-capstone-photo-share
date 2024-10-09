import "./UserProfileContainer.css"

import { useState, useEffect } from "react";

import { Profile } from "../../../models/profile";
import profileService from "../../../services/profile-service";

export default function UserProfileContainer({profileId}: {profileId: number})
{
    const [profile, setProfile] = useState<Profile>();

    useEffect(() => {
        profileService.getById(profileId).then(data => {
            setProfile(data);
        });
    }, [profileId]);

    return (
        <section className="mt-5 profile-container">
            {/* modify this to pull from CLAPI */}
            <p>{profile?.profileImg}</p>

            <div>
                <p className="username">{profile?.userName}</p>
                <p>{profile?.bio}</p>
            </div>
        </section>
    )
}