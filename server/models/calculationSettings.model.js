import mongoose from 'mongoose';
import crypto from 'crypto';

// User Schema
const CalculationSettingsSchema = new mongoose.Schema({
    juniorPaygrade: {
        type: Number,
        required: 'Paygrade is required'
    },
    standardPaygrade: {
        type: Number,
        required: 'Paygrade is required'
    },
    seniorPaygrade: {
        type: Number,
        required: 'Paygrade is required'
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('CalculationSettings', CalculationSettingsSchema);;
