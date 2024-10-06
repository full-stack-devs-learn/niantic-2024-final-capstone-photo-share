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
('gollum','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER');

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

INSERT INTO profiles(user_id, profile_img, bio)
VALUES
(1, "profile_img1.jpg", "Hello, I'm user 1!"),
(2, "profile_img2.jpg", "This is user 2's bio."),
(3, "profile_img3.jpg", "User 3 here, nice to meet you!"),
(4, "profile_img4.jpg", "Welcome to user 4's profile!"),
(5, "profile_img5.jpg", "Hey, I'm user 5!"),
(6, "profile_img6.jpg", "This is the profile of user 6.");

INSERT INTO albums (user_id, title, description, created_at)
VALUES
(1, 'My First Album', 'This is the description of the first album', NOW());

INSERT INTO posts (user_id, public_id, title, captions, created_at, album_id)
VALUES
(1, 'testImg1.jpg', 'Post Title 1', 'This is the caption for post 1', NOW(), 1),
(2, 'testImg2.jpg', 'Post Title 2', 'This is the caption for post 2', NOW(), NULL),
(3, 'testImg3.jpg', 'Post Title 3', 'This is the caption for post 3', NOW(), NULL),
(1, 'testImg4.jpg', 'Post Title 4', 'This is the caption for post 4', NOW(), NULL),
(2, 'testImg5.jpg', 'Post Title 5', 'This is the caption for post 5', NOW(), NULL);
