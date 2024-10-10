USE photo_share;


-- PROFILE SEEDING --
INSERT INTO profiles(user_id, profile_img, bio)
VALUES
(1, "qipoecbc5evjszubti0l", "Hello, I'm user 1!"),
(2, "profile_img2.jpg", "This is user 2's bio."),
(3, "profile_img3.jpg", "User 3 here, nice to meet you!"),
(4, "profile_img4.jpg", "Welcome to user 4's profile!"),
(5, "profile_img5.jpg", "Hey, I'm user 5!"),
(6, "Ash_3_rbbtbo", "Hey, I'm Ash Ketchum from Pallet Town");

-- POST SEEDING --
INSERT INTO posts (user_id, public_id, title, captions, created_at, album_id)
VALUES
-- USER 1 --
-- USER 2 --
-- USER 3 --
-- USER 4 --
-- USER 5 --
-- USER 6 --
(6, "ash_ketchum_2_fghgim", 'Family Photo', 'All Of Us', NOW(), NULL),
(6, "Ash_3_rbbtbo", 'Selfie', 'Win', NOW(), NULL)
