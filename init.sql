DROP TABLE IF EXISTS Attack CASCADE;
DROP TABLE IF EXISTS Trainer_Pokeman CASCADE;
DROP TABLE IF EXISTS Pokeman CASCADE;
DROP TABLE IF EXISTS Trainer CASCADE;

CREATE TABLE Pokeman(
	pokeman_id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	max_life_point INTEGER NOT NULL,
	life_point INTEGER NOT NULL
);

CREATE TABLE Attack(
	attack_id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	damage INTEGER NOT NULL,
	usage_limit INTEGER NOT NULL,
	usage_count INTEGER DEFAULT 0,
	pokeman_id INTEGER REFERENCES Pokeman(pokeman_id) ON DELETE CASCADE
);

CREATE TABLE Trainer(
    trainer_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    level INTEGER DEFAULT 1,
    experience INTEGER DEFAULT 0
);

CREATE TABLE Trainer_Pokeman(
    trainer_id INTEGER REFERENCES Trainer(trainer_id) ON DELETE CASCADE,
    pokeman_id INTEGER REFERENCES Pokeman(pokeman_id) ON DELETE CASCADE,
    PRIMARY KEY (trainer_id, pokeman_id)
);

CREATE INDEX idx_attack_pokeman ON Attack(pokeman_id);
CREATE INDEX idx_trainer_pokeman_trainer ON Trainer_Pokeman(trainer_id);
CREATE INDEX idx_trainer_pokeman_pokeman ON Trainer_Pokeman(pokeman_id);
