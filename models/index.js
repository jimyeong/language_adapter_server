"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};
const User = require("./users");
const EnglishWords = require("./englishWords");
const Meanings = require("./meanings");
const Synonyms = require("./synonyms");
const MeaningMemos = require("./meaningMemos");
// const Quizes = require("./quizes");
// const Hints = require("./hints");
const Tags = require("./tags");
const Usecases = require("./usecases");

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
User.init(sequelize);
EnglishWords.init(sequelize);
Meanings.init(sequelize);
Synonyms.init(sequelize);
MeaningMemos.init(sequelize);
// Quizes.init(sequelize);
// Hints.init(sequelize);
Tags.init(sequelize);
Usecases.init(sequelize);

// Dictionary.init(sequelize);
// Quizes.init(sequelize);
// Hints.init(sequelize);

db.User = User;
db.EnglishWords = EnglishWords;
db.Meanings = Meanings;
db.Synonyms = Synonyms;
db.MeaningMemos = MeaningMemos;
// db.Quizes = Quizes;
// db.Hints = Hints;
db.Tags = Tags;
db.Usecases = Usecases;

// db.Dictionary = Dictionary;
// db.Quizes = Quizes;
// db.Hints = Hints;

User.associate(db);
EnglishWords.associate(db);
Meanings.associate(db);
Synonyms.associate(db);
MeaningMemos.associate(db);
// Quizes.associate(db);
// Hints.associate(db);
Tags.associate(db);
Usecases.associate(db);

// Dictionary.associate(db);
// Quizes.associate(db);
// Hints.associate(db);

module.exports = db;
