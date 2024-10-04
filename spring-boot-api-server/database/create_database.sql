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

CREATE TABLE albums (
    album_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(25) NOT NULL,
    description VARCHAR(100) NULL,
    created_at DATETIME NOT NULL,
    PRIMARY KEY (album_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE posts (
    post_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    title VARCHAR(25) NOT NULL,
    caption VARCHAR(100),
    reactions INT DEFAULT 0,
    album_id INT NULL,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (album_id) REFERENCES Albums(album_id)
);

INSERT INTO albums (user_id, title, description, created_at)
VALUES
(1, 'My First Album', 'This is the description of the first album', NOW());

INSERT INTO posts (user_id, img_url, title, caption, created_at, album_id)
VALUES
(1, 'testImg1.jpg', 'Post Title 1', 'This is the caption for post 1', NOW(), 1),
(2, 'testImg2.jpg', 'Post Title 2', 'This is the caption for post 2', NOW(), NULL),
(3, 'testImg3.jpg', 'Post Title 3', 'This is the caption for post 3', NOW(), NUll),
(1, 'testImg4.jpg', 'Post Title 4', 'This is the caption for post 4', NOW(), NULL),
(2, 'testImg5.jpg', 'Post Title 5', 'This is the caption for post 5', NOW(), NULL);
