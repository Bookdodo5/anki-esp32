const asyncHandler = require('express-async-handler');
const Word = require('../models/wordModel');

const getWords = asyncHandler(async (req,res) => {
    const words = await Word.find();
    res.status(200).json(words);
})

const getWord = asyncHandler(async (req,res) => {
    res.status(404);
    const word = await Word.findById(req.params.id);
    if(word) {
        res.status(200).json(word);
    }
    throw new Error('Word not found');
})

const addWord = asyncHandler(async (req,res) => {
    const {word,sentence} = req.body;
    if(!word) {
        res.status(400);
        throw new Error('Word is required');
    }

    const newWord = await Word.create({word,sentence});
    res.status(201).json(newWord);
})

const updateWord = asyncHandler(async (req,res) => {
    res.status(404);
    const oldWord = await Word.findById(req.params.id);
    if(!oldWord) throw new Error('Word not found');

    const updatedWord = await Word.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedWord);
})

const deleteWord = asyncHandler(async (req,res) => {
    res.status(404);
    const word = await Word.findById(req.params.id);
    if(!word) throw new Error('Word not found');
    console.log(word)

    const deletedWord = await Word.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedWord);
    
})

module.exports = {getWords, getWord, addWord, updateWord, deleteWord};