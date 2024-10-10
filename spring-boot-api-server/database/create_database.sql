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
VALUES  ('user','$2a$10$NkufUPF3V8dEPSZeo1fzHe9ScBu.LOay9S3N32M84yuUM2OJYEJ/.','ROLE_USER'),
('admin','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_ADMIN'),
('gandalf','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_ADMIN'),
('frodo','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER'),
('samwise','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_HOBBIT'),
('Ash Ketchum','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER');

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
(1, "qipoecbc5evjszubti0l", "Hello, I'm user 1!"),
(2, "profile_img2.jpg", "This is user 2's bio."),
(3, "profile_img3.jpg", "User 3 here, nice to meet you!"),
(4, "profile_img4.jpg", "Welcome to user 4's profile!"),
(5, "profile_img5.jpg", "Hey, I'm user 5!"),
(6, "Ash_3_rbbtbo", "Hey, I'm Ash Ketchum from Pallet Town");

INSERT INTO albums (user_id, title, description, created_at)
VALUES
(1, 'My First Album', 'This is the description of the first album', NOW());

INSERT INTO posts (user_id, public_id, title, captions, created_at, album_id)
VALUES
(1, 'cld-sample-2', 'Post Title 1', 'This is the caption for post 1', NOW(), 1),
(2, 'cld-sample-3', 'Post Title 2', 'This is the caption for post 2', NOW(), NULL),
(3, 'cld-sample-4', 'Post Title 3', 'This is the caption for post 3', NOW(), NULL),
(1, 'cld-sample-5', 'Post Title 4', 'This is the caption for post 4', NOW(), NULL),
(2, 'MooDeng_aqxolp', 'Post Title 5', 'This is the caption for post 5', NOW(), NULL),
(2, 'cld-sample', 'Post Title 6', 'This is the caption for post 6', NOW(), NULL),
(1, 'sample', 'Post Title 7', 'This is the caption for post 7', NOW(), NULL),
(1, 'alin-gavriliuc-eRSqX5Vz1g0-unsplash_oeeeoe', 'Post Title 8', 'This is the caption for post 8', NOW(), NULL),
(1, 'rebeca-g-sendroiu-8q3hMAfz0Jg-unsplash_tnjz86', 'Post Title 9', 'This is the caption for post 9', NOW(), NULL),
(1, 'vicky-ToyX8yzU0SU-unsplash_rwvlea', 'Post Title 10', 'This is the caption for post 10', NOW(), NULL),
(1, 'andrea-davis-gIA1bMAkIPM-unsplash_hmlquw', 'Post Title 11', 'This is the caption for post 11', NOW(), NULL),
(1, 'carter-obasohan-QwmKJTO8hyE-unsplash_yhcdre', 'Post Title 12', 'This is the caption for post 12', NOW(), NULL);


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

