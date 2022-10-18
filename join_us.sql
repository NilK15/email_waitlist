--use join_us;

SELECT * FROM users;

INSERT INTO users (email) 
VALUES
('Katie34@yahoo.com'),
('Tunde@gmail.com');

SELECT COUNT(*) FROM users;

DELETE FROM users;

SELECT email, created_at FROM users WHERE created_at = (
    SELECT created_at FROM users ORDER BY created_at ASC LIMIT 1
)