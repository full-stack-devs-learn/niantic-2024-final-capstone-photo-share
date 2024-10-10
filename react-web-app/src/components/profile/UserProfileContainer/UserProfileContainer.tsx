import "./UserProfileContainer.css"

import { useState, useEffect } from "react";

import { Profile } from "../../../models/profile";
import profileService from "../../../services/profile-service";

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

export default function UserProfileContainer({profileId}: {profileId: number})
{
    const [profile, setProfile] = useState<Profile>();

    useEffect(() => {
        profileService.getById(profileId).then(data => {
            setProfile(data);
        });
    }, [profileId]);

    const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });

    const img = cld
    .image(profile?.profileImg)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(130).height(130))
    .roundCorners(byRadius(150));

    return (
        <section className="mt-5 profile-container">
            <AdvancedImage cldImg={img} />

            <div>
                <p className="username">{profile?.userName}</p>
                <p>{profile?.bio}</p>
            </div>
        </section>
    )
}