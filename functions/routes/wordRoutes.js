const express = require('express');
const router = express.Router();

const {getWords, getWord, addWord, updateWord, deleteWord} = require('../controllers/wordController');

router.route("/").get(getWords).post(addWord);

router.route("/:id").get(getWord).put(updateWord).delete(deleteWord);

module.exports = router;