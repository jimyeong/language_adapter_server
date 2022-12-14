const router = require("express").Router();
const helper = require("../helper");
const Dictionary = require("../models/dictionaries");
// const Hints = require("../models/hints");
// const Quizes = require("../models/quizes");
const Users = require("../models/users");
const Usecases = require("../models/usecases");
const logger = require("../logger/logger");
const EnglishWords = require("../models/englishWords");
const Meanings = require("../models/meanings");
const MeaningMemos = require("../models/meaningMemos");
const Synonyms = require("../models/synonyms");
const Tags = require("../models/tags");
const { checkSessionExist } = require("../middlewares/authenticate");

const { dateFormatter } = helper;

router.post("/", checkSessionExist, async (req, res, next) => {
  const onSuccess = (words) => {
    return res.json(words);
  };
  const onError = (error) => {
    logger.info(error);
    logger.error(error);
    res.json(error);
  };
  console.log(EnglishWords);

  const user = await Users.findOne({
    where: {
      email: req.session.userId,
    },
  });
  console.log(["@@@W!@@@@@@@@@"], user);

  EnglishWords.findAll({
    where: { user_id: user.dataValues.id },
    include: [
      {
        model: Meanings,
        as: "meanings",
        attributes: [
          "explanation_en",
          "explanation_mt",
          "meaning_image",
          "meaning_id",
        ],
        include: [
          {
            model: Usecases,
            as: "usecases",
            attributes: ["lang_english", "lang_origin", "key_phrase"],
          },
          {
            model: Tags,
            as: "tags",
            attributes: ["tag_content"],
          },
          {
            model: Synonyms,
            as: "synonyms",
            attributes: ["synonym"],
          },
          {
            model: MeaningMemos,
            as: "meanigMemos",
            attributes: ["memo_content"],
          },
        ],
      },
    ],
  })
    .then(onSuccess)
    .catch(onError);
});

router.post("/add", async (req, res, next) => {
  const newEnglishWord = {};
  const newHints = {};
  const newUseCases = {};
  const newMeaningMemo = {};
  const newMeaning = {};
  const newSynonyms = {};
  const newTags = {};
  newEnglishWord.user_id = req.body.userId;
  newEnglishWord.english_word = req.body.english_word;
  const englishword = await EnglishWords.create(newEnglishWord);
  console.log("englishWord", englishword);

  // newMeaning.usecase = req.body.usecase;
  const meaningsData = req.body.meanings.map((meaning) => {
    const _meanings = {};
    _meanings.explanation_en = meaning.explanation_en;
    _meanings.explanation_mt = meaning.explanation_mt;
    _meanings.english_word_id = englishword.dataValues.english_word_id;

    if (meaning.meaning_image) _meanings.meaning_image = meaning.meaning_image;
    return _meanings;
  });
  const _meanings = await Meanings.bulkCreate(meaningsData);

  // ????????? ???????????? ??????????????? ????????? ?????? ??????.
  // console.log(["_mening"], _meanings);

  // usecase data input
  const usecase_arr = [];
  for (let i = 0; i < _meanings.length; i++) {
    for (let j = 0; j < req.body.meanings[i].usecases.length; j++) {
      const usecases = {};
      const u = req.body.meanings[i].usecases[j];
      usecases.lang_english = u.lang_english;
      usecases.lang_origin = u.lang_origin;
      usecases.key_phrase = u.key_phrase;
      usecases.meaning_id = _meanings[i].dataValues.meaning_id;
      usecase_arr.push(usecases);
    }
  }
  const _usecases = await Usecases.bulkCreate(usecase_arr);

  // ????????? ??????
  const synonyms_arr = [];
  for (let i = 0; i < _meanings.length; i++) {
    for (let j = 0; j < req.body.meanings[i].synonyms.length; j++) {
      const synonyms = {};
      synonyms.synonym = req.body.meanings[i].synonyms[j];
      synonyms.meaning_id = _meanings[i].dataValues.meaning_id;
      synonyms_arr.push(synonyms);
    }
  }
  const _synonyms = await Synonyms.bulkCreate(synonyms_arr);

  // ????????????
  const tags_arr = [];
  for (let i = 0; i < _meanings.length; i++) {
    for (let j = 0; j < req.body.meanings[i].tags.length; j++) {
      const tags = {};
      tags.tag_content = `#${req.body.meanings[i].tags[j]}`;
      tags.meaning_id = _meanings[i].dataValues.meaning_id;
      tags_arr.push(tags);
    }
  }
  const _tags = await Tags.bulkCreate(tags_arr);

  // ????????????
  const memos_arr = [];
  for (let i = 0; i < _meanings.length; i++) {
    for (let j = 0; j < req.body.meanings[i].meaningMemos.length; j++) {
      const memos = {};
      memos.memo_content = req.body.meanings[i].meaningMemos[j];
      memos.meaning_id = _meanings[i].dataValues.meaning_id;
      memos_arr.push(memos);
    }
  }
  const _memos = await MeaningMemos.bulkCreate(memos_arr);

  res.json({ message: "success" });
  const onSuccess = (words) => {
    res.json({ message: "success" });
  };
  const onError = (err) => {
    const message = new Error("internal server error");
    res.status(500).json({ message: "fail" });
  };
});

router.delete("/delete/:english_word_id", (req, res, next) => {
  const { english_word_id } = req.params;

  const onSuccess = (words) => {
    res.json({ message: "ok", data: words, statusMessage: "success" });
  };
  const onError = (error) => {
    // const message = new Error("internal server error");
    res.json({ message: error, statusMessage: "error" });
  };

  EnglishWords.destroy({
    where: {
      english_word_id,
    },
  })
    .then(onSuccess)
    .catch(onError);
});

module.exports = router;
