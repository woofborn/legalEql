CREATE TABLE IF NOT EXISTS lawyers (
	id SERIAL PRIMARY KEY,
	name TEXT,
	username TEXT,
	password TEXT,
	is_partner BOOLEAN
);

CREATE TABLE IF NOT EXISTS projects (
	id SERIAL PRIMARY KEY,
	name TEXT
);

CREATE TABLE IF NOT EXISTS project_assignment (
	id SERIAL PRIMARY KEY,
	partner_id INTEGER,
	associate_id INTEGER,
	project_id INTEGER
);