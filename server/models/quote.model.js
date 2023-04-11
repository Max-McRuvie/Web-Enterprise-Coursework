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
    physicalResources: {
        type: Array,
        required: 'Physical Resources are required'
    },
    total_cost: {
        type: Number,
        required: 'Total Cost is required'
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})


export default mongoose.model('Quote', QuoteSchema);;
