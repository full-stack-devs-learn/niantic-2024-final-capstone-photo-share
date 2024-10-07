USE photo_share;

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