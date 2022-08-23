const router = require("express").Router();
const helper = require("../helper");
const Sequelize = require("sequelize");
const { Op } = Sequelize;
// const Dictionary = require("../models/dictionaries");
// const Hints = require("../models/hints");
// const Quizes = require("../models/quizes");
const Usecases = require("../models/usecases");
const db = require("../models");
const { checkSessionExist } = require("../middlewares/authenticate");

const logger = require("../logger/logger");

const { sequelize } = db;
const { dateFormatter } = helper;

router.post("/", checkSessionExist, (req, res, next) => {
  const onSuccess = (words) => {
    return res.json(words);
  };
  const onError = (error) => {
    logger.info(error);
    logger.error(error);
    res.json(error);
  };

  Usecases.findAll({
    attributes: {
      where: {
        meaning_id: {
          [Op.or]: [
            sequelize.literal(`
                    (
                        select meaning_id from meanings where english_word_id in (SELECT english_word_id FROM language_adapter.english_words
                        where user_id = 1)
                    )
                `),
          ],
        },
      },
    },
  })
    .then(onSuccess)
    .catch(onError);
});

module.exports = router;
