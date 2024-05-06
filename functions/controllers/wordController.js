const asyncHandler = require('express-async-handler');
const Word = require('../models/wordModel');
const {intervalTime} = require('../constants');

const getWords = asyncHandler(async (req,res) => {
    const words = await Word.find({user_id: req.user.id});
    res.status(200).json(words);
})

const getWord = asyncHandler(async (req,res) => {
    res.status(404);
    const word = await Word.findById(req.params.id);
    if(!word) throw new Error('Word not found');

    res.status(403);
    if(word.user_id.toString()!== req.user.id.toString()) throw new Error('You are not authorized to get this word');

    if(word) {
        res.status(200).json(word);
    }
})

const addWord = asyncHandler(async (req,res) => {
    let {word,sentence,meaning,context} = req.body;
    word = word.toLowerCase();
    res.status(400);
    if(!word) throw new Error('Word is required');
    if(!sentence) throw new Error('Sentence is required');
    if(!meaning) throw new Error('Meaning is required');
    if(!context) throw new Error('Context is required');
    const newWord = await Word.create({
        word,
        sentence,
        meaning,
        context,
        lastSeenInContext: Date.now(),
        lastReviewed: Date.now(),
        nextReview: Date.now(),
        reviewInterval: 1,
        user_id: req.user.id
    });
    res.status(201).json(newWord);
})

const updateWord = asyncHandler(async (req,res) => {
    res.status(404);
    const oldWord = await Word.findById(req.params.id);
    if(!oldWord) throw new Error('Word not found');

    res.status(403);
    if(oldWord.user_id.toString()!== req.user.id.toString()) throw new Error('You are not authorized to update this word');

    const updatedWord = await Word.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedWord);
})

const deleteWord = asyncHandler(async (req,res) => {
    res.status(404);
    const word = await Word.findById(req.params.id);
    if(!word) throw new Error('Word not found');

    res.status(403);
    if(word.user_id.toString()!== req.user.id.toString()) throw new Error('You are not authorized to delete this word');

    const deletedWord = await Word.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedWord);
    
})

const getNextReview = asyncHandler(async (req,res) => {
    
    res.status(404);
    const words = await Word.find({user_id: req.user.id});
    if(!words) throw new Error('No words found');

    words.sort((a,b) => {
        return a.nextReview - b.nextReview;
    });

    words[0].shouldBeReviewed = (words[0].nextReview <= Date.now()) || words[0].reviewInterval <= 1;
    res.status(200).json(words[0]);
})

const updateReviewInterval = asyncHandler(async (req,res) => {

    res.status(404);
    const words = await Word.find({user_id: req.user.id});
    if(!words) throw new Error('No words found');
    
    res.status(401);
    const {reviewResult} = req.body;
    if(!reviewResult) throw new Error('Review result is required');
    
    words.sort((a,b) => {
        return a.nextReview - b.nextReview;
    });
    let word = words[0];
    
    switch(reviewResult) {
        case 'easy':
            word.reviewInterval = Math.min(word.reviewInterval + 2, 9);
            break;
        case 'normal':
            word.reviewInterval = Math.min(word.reviewInterval + 1, 9);
            break;
        case 'again':
            word.reviewInterval = Math.max(Math.floor(word.reviewInterval / 2), 0);
            break;
        default:
            throw new Error('Review result is not valid');
    }

    word.nextReview = Date.now() + (intervalTime[word.reviewInterval]*1000*60);
    word.lastReviewed = Date.now();

    const newInterval = await Word.findByIdAndUpdate(word.id, word, {new: true})

    res.status(200).json(newInterval);
})

const foundInContext = asyncHandler(async (req,res) => {

    res.status(401);
    const {sentence, context, word} = req.body;
    if(!sentence || !context || !word) throw new Error('All fields are required');

    res.status(404);
    let oldWord = await Word.findOne({word: req.body.word});
    if(!oldWord) throw new Error('Word not found');

    oldWord.lastSeenInContext = Date.now();
    oldWord.sentence.push(sentence);
    oldWord.context.push(context);

    const updatedWord = await Word.findByIdAndUpdate(oldWord.id, oldWord, {new: true})

    res.status(200).json(updatedWord);
})

const findWord = asyncHandler(async (req,res) => {

    res.status(404);
    let word = await Word.findOne({word: req.params.word.toLowerCase()});
    if(!word) throw new Error('Word not found');

    res.status(200).json(word);
})

module.exports = {getWords, getWord, addWord, updateWord, deleteWord, getNextReview, updateReviewInterval, foundInContext, findWord};