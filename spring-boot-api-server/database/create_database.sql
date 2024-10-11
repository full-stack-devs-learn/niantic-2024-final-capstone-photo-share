# ---------------------------------------------------------------------- #
# Target DBMS:           MySQL                                           #
# Project name:          PhotoShare                                      #
# ---------------------------------------------------------------------- #
DROP DATABASE IF EXISTS photo_share;

CREATE DATABASE IF NOT EXISTS photo_share;

USE photo_share;

# ---------------------------------------------------------------------- #
# Tables                                                                 #
# ---------------------------------------------------------------------- #

CREATE TABLE users (
                       user_id INT NOT NULL AUTO_INCREMENT,
                       username VARCHAR(50) NOT NULL,
                       hashed_password VARCHAR(255) NOT NULL,
                       role VARCHAR(50) NOT NULL,
                       PRIMARY KEY (user_id)
);


/*  INSERT Users  */
/* Users and Passwords
username	password
--------	--------
user		password
admin		password
gandalf		password
frodo		password
samwise		password
gollum		password

 are: password */
INSERT INTO users (username, hashed_password, role)
VALUES  ('Gregor','$2a$10$NkufUPF3V8dEPSZeo1fzHe9ScBu.LOay9S3N32M84yuUM2OJYEJ/.','ROLE_USER'),
('john_doe','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_ADMIN'),
('gandalf','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_ADMIN'),
('frodo','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER'),
('Professor Oak','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_HOBBIT'),
('ash_ketchum','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER');

CREATE TABLE profiles 
(
	profile_id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT NOT NULL,
    profile_img VARCHAR(255),
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE albums (
    album_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(25) NOT NULL,
    description VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (album_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE posts (
    post_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    public_id VARCHAR(255) NOT NULL,
    title VARCHAR(25) NOT NULL,
    captions VARCHAR(100),
    reactions INT DEFAULT 0,
    album_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (album_id) REFERENCES Albums(album_id)
);

CREATE TABLE post_interactions (
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    interacted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE (post_id, user_id)
);

CREATE TABLE comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- SCHEDULER --
SET GLOBAL event_scheduler = ON;
DROP EVENT IF EXISTS update_likes_event;

DELIMITER //
CREATE EVENT update_likes_event
ON SCHEDULE EVERY 10 SECOND
DO
BEGIN
	UPDATE posts p
	SET reactions = (
		SELECT COUNT(*)
		FROM post_interactions pi
		WHERE pi.post_id = p.post_id AND pi.interacted = TRUE
	);
END //

DELIMITER ;


-- DATA --
INSERT INTO profiles(user_id, profile_img, bio)
VALUES
(1, "gregor_gengar_ol6rg2", "Teaching People"),
(2, "llwyfxpjsend3cvmfdp8", "I'm a nature enthusiast, always seeking the beauty in the great outdoors. Join me as I hike, camp, and appreciate the world around us."),
(3, "nxqe8esniintwphhulqx", "Capturing life's little moments, one click at a time! 📸 Follow my journey on PhotoShare, where I share my daily adventures and the beauty around me."),
(4, "hotpg7l7qn9pjlnuxewm", "Foodie and amateur chef here! I love experimenting in the kitchen and sharing my culinary creations."),
(5, "zv8u5ndzemnfnmkddobw", "Nature lover and outdoor enthusiast. "),
(6, "Ash_3_rbbtbo", "Hey, I'm Ash Ketchum from Pallet Town");

INSERT INTO albums (user_id, title, description, created_at)
VALUES
(1, 'Food Adventures', 'From street food to gourmet, this album captures my delicious adventures.', NOW());

INSERT INTO posts (user_id, public_id, title, captions, created_at, album_id)
VALUES
(1, 'cld-sample-2', 'Mountain Peak', 'Soaring heights and breathtaking views. The mountain peak offers a sense of peace and adventure.', NOW(), NULL),
(2, 'anna-blake-jUTaSxn-NOw-unsplash_ogatwi', 'Cute Cat', 'Whiskers, the purrfect furball, posing adorably. A fluffy bundle of joy, brightening my day!', NOW(), NULL),
(3, 'cld-sample-4', 'Saturday Breakfast', 'Saturday mornings call for fluffy waffles, fresh fruit, and a warm cup of coffee. Bliss!', NOW(), NULL),
(1, 'fjbb85j8tj1s3dqhrl77', 'Cozy Desk', 'Creating a cozy workspace for productivity and comfort. Let the inspiration flow!', NOW(), NULL),
(2, 'MooDeng_aqxolp', 'Cute Hippo', 'Look at this adorable hippo enjoying a lazy day at the zoo. So fluffy and full of charm!', NOW(), NULL),
(2, 'cld-sample', 'Dog Photoshoot', 'Strike a pose! My furry friend\'s adorable photoshoot, capturing their playful spirit and charm.', NOW(), NULL),
(1, 'sample', 'Flower and Bee', 'Nature\'s delicate dance: a bee\'s graceful encounter with vibrant flowers.', NOW(), NULL),
(1, 'alin-gavriliuc-eRSqX5Vz1g0-unsplash_oeeeoe', 'Cocktail Night', 'Cheers to the weekend! Clinking glasses, sharing laughter, and creating memories.', NOW(), NULL),
(1, 'rebeca-g-sendroiu-8q3hMAfz0Jg-unsplash_tnjz86', 'Apple Picking', 'Autumn bliss! Basking in the orchard, we picked the sweetest apples.', NOW(), NULL),
(1, 'vicky-ToyX8yzU0SU-unsplash_rwvlea', 'Late Summer Salad', 'A refreshing salad to savor the last days of summer. Crisp veggies and a tangy dressing.', NOW(), 1),
(1, 'andrea-davis-gIA1bMAkIPM-unsplash_hmlquw', 'Cozy Hotel', 'A home away from home.', NOW(), NULL),
(1, "wheelOfnames_uzsqwv", 'Torturing Students', 'Giving people anxiety', NOW(), NULL);

INSERT INTO comments (content, post_id, user_id, created_at)
VALUES
('Great photo!', 1, 6, NOW()),
('stunning', 1, 2, NOW());

-- ADDING LIKES --
INSERT INTO post_interactions (post_id, user_id, interacted, created_at) VALUES 
(1, 1, TRUE, CURRENT_TIMESTAMP),    
(1, 2, TRUE, CURRENT_TIMESTAMP),   
(1, 3, TRUE, CURRENT_TIMESTAMP),  
(1, 4, TRUE, CURRENT_TIMESTAMP),    
(2, 1, TRUE, CURRENT_TIMESTAMP),    
(2, 4, TRUE, CURRENT_TIMESTAMP),    
(3, 5, TRUE, CURRENT_TIMESTAMP),    
(3, 6, TRUE, CURRENT_TIMESTAMP),    
(4, 1, TRUE, CURRENT_TIMESTAMP),   
(4, 2, TRUE, CURRENT_TIMESTAMP),     
(5, 3, TRUE, CURRENT_TIMESTAMP),    
(6, 1, TRUE, CURRENT_TIMESTAMP),    
(7, 2, TRUE, CURRENT_TIMESTAMP),   
(8, 3, TRUE, CURRENT_TIMESTAMP),    
(9, 4, TRUE, CURRENT_TIMESTAMP),    
(10, 5, TRUE, CURRENT_TIMESTAMP),   
(11, 6, TRUE, CURRENT_TIMESTAMP),    
(12, 1, TRUE, CURRENT_TIMESTAMP);    

