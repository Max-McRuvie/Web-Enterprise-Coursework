import mongoose from 'mongoose';
import crypto from 'crypto';

// Quote Schema
const QuoteSchema = new mongoose.Schema({
    uID:{
        type: String,
        trim: true,
        required: 'uID is required'
    },
    title: {
        type: String,
        trim: true,
        required: 'Title is required'
    },
    workers: {
        type: Array,
        required: 'Workers are required'
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

const quoteModel = mongoose.model('Quote', QuoteSchema);
quoteModel.createIndexes();
export default quoteModel;
