-- SQLite
INSERT INTO `things` (personId, description)
VALUES
  (1, "Prepare for the upcoming diversity GA panel"),
  (2, "Write up a plan for this quarter's 1on1s")
;

INSERT INTO `persons` (firstName, lastName, email, auth0UserId)
VALUES
  ("Laura", "Lennon", "llennon@seatgeek.com", "auth0id1"),
  ("Chris", "Gray", "zhammer@seatgeek.com", "auth0id2")
;
