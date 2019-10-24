CREATE TABLE IF NOT EXISTS partners (
	id SERIAL PRIMARY KEY,
	pname TEXT,
	username TEXT,
	password TEXT
);

CREATE TABLE IF NOT EXISTS associates(
	id SERIAL PRIMARY KEY,
	aname TEXT,
	area TEXT,
	location TEXT
);

CREATE TABLE IF NOT EXISTS projects (
	id SERIAL PRIMARY KEY,
	name TEXT,
	partner_id INTEGER,
	complete BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS project_assignment (
	id SERIAL PRIMARY KEY,
	associate_id INTEGER,
	project_name TEXT
);