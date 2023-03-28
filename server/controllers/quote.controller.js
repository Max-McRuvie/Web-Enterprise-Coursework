import Quote from '../models/quote.model.js';

const calculateQuote = async (req, res) => {
    const projectInfo = req.body;
    let totalLaborCost = 0;
    for (let i = 0; i < projectInfo.workers.length; i++) {
        const worker = projectInfo.workers[i];
        const workerCost = worker.hourlyRate * worker.hoursRequired;
        totalLaborCost += workerCost;
    }

    let finalQuote = {
        totalCost: totalLaborCost
    }

    return res.status(200).json({
        finalQuote
    })
}
    

const createQuote = async (req, res) => {
    const quote = new Quote(req.body);
    console.log(quote)
    console.log('jeff')
    try {
        await quote.save();
        return res.status(200).json({
            message: "Successfully created quote!"
        })
    } catch (err) {
        return res.status(400).json({
            error: {err}
        })
    }
}

export default {
    createQuote,
    calculateQuote,
}