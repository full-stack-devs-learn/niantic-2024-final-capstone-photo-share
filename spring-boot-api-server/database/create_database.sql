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
    created_at DATETIME NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (album_id) REFERENCES Albums(album_id)
);
