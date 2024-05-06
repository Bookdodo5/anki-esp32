const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');

const {getWords, getWord, addWord, updateWord, deleteWord, getNextReview, updateReviewInterval, foundInContext, findWord} = require('../controllers/wordController');

router.use(validateToken);
router.route("/review").get(getNextReview).put(updateReviewInterval);
router.route("/").get(getWords).post(addWord).put(foundInContext);
router.route("/:id").get(getWord).put(updateWord).delete(deleteWord);
router.route("/search/:word").get(findWord);

module.exports = router;