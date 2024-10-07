import { useState, useEffect } from "react";

import { Profile } from "../../models/profile";
import profileService from "../../services/profile-service";

export default function UserProfileContainer({profileId}: {profileId: number})
{
    const [profile, setProfile] = useState<Profile>();

    useEffect(() => {
        profileService.getById(profileId).then(data => {
            setProfile(data);
        });
    }, [profileId]);

    return (
        <section className="container mt-4">
            {/* modify this to pull from CLAPI */}
            <p>{profile?.profileImg}</p>

            <p>{profile?.userName}</p>
            <p>{profile?.bio}</p>
        </section>
    )
}