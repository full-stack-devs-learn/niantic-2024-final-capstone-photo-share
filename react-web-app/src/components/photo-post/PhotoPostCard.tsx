import { Card } from "react-bootstrap";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart }  from "@fortawesome/free-solid-svg-icons";
import photoPostService from "../../services/photo-post-service";
import { useState } from "react";
import { Link } from 'react-router-dom';
import "./PhotoPostFeed.css"

interface PhotoPostProps {
    userId: number;
    publicId: string;
    title: string;
    captions: string;
    reactions: number;
    postId: number;
    hasInteracted: boolean|null;
}

export default function PhotoPostCard({userId, publicId, title, captions, reactions, postId, hasInteracted}: PhotoPostProps)
{
    const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });
    const { user, isAuthenticated } = useSelector((state: RootState) => state.authentication);

    const [interact, setInteract] = useState<boolean|null>(hasInteracted)
    const [currentReactions, setCurrentReactions] = useState<number>(reactions)
    const [showHeartNoti, setShowHeartNoti] = useState<boolean>(false)

    const img = cld
    .image(publicId)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(300).height(300));

    async function likeHandler() {

     if(isAuthenticated){
            photoPostService.interact(postId, user?.id)
            setInteract(!interact)
            if(!interact){
                setCurrentReactions(currentReactions+1)
                setShowHeartNoti(true);
                setTimeout(() => { setShowHeartNoti(false) }, 2000);
            } else {
                setCurrentReactions(currentReactions-1)
            }
        }
    }
    
 
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Header>{userId}</Card.Header>
            <div id="img-wrapper">
                <AdvancedImage 
                    onClick={likeHandler}
                    cldImg={img} 
                    />
                {showHeartNoti && (
                <div className="heart-animation" onAnimationEnd={() => setShowHeartNoti(false)}>
                    <FontAwesomeIcon icon={solidHeart} color="red" size="2x" />
                </div>
                )}
            </div>
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{captions}</Card.Text>
            {isAuthenticated
            ?   <Card.Text>
                {currentReactions}
                    <FontAwesomeIcon
                    icon={interact ? solidHeart : faHeart}
                    color={interact ? "red" : "black"}
                    />
                </Card.Text>

            :   <Card.Text>
                {reactions}
                <FontAwesomeIcon
                icon={faHeart}
                />
                </Card.Text>
            }

            <Link to={`/comments/${postId}`} className="btn btn-link">
                                View Comments
                            </Link>
                        </Card.Body>
                    </Card>
                );
        }
