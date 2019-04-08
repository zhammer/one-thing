INSERT INTO persons (first_name, last_name, email, auth0_user_id)
VALUES
  ('Laura', 'Lennon', 'llennon@seatgeek.com', 'auth0id1'),
  ('Chris', 'Gray', 'zhammer@seatgeek.com', 'auth0id2')
;

INSERT INTO things (person_id, description)
VALUES
  (1, 'Prepare for the upcoming diversity GA panel'),
  (2, 'Write up a plan for this quarters 1on1s')
;
