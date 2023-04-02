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

const getQuoteByID = async (req, res) => {
    try {
        const id = req.params.quoteId;
        let quote = await Quote.find({_id : id})
        res.json(quote);
    } catch (err) {
        return res.status(400).json({
            error: {err}
        })
    }
}

const listQuotes = async (req, res) => {
    try {
        const id = req.params.userId
        let quotes = await Quote.find({uID : id})
        // .select('quote author');
        res.json(quotes);
    } catch (err) {
        return res.status(400).json({
            error: {err}
        })
    }
}

const updateQuote = async (req, res) => {
    try{
        let id = req.params.quoteId
        let quote = req.body

        await Quote.updateOne({_id : id}, quote)
        res.sendStatus(204);
    }
    catch (err) {
        return res.status(400).json({
            error: {err}
        })
    }
}

const removeQuote = async (req, res) => {
    try {
      let id = req.body.quoteIds;
      let userId = req.params.userId;
        
      if (Array.isArray(id)) {
        await Quote.deleteMany({ _id: { $in: id}, uID: userId });
        res.sendStatus(204);
      } else {
        await Quote.deleteOne({ _id: id, uID: userId });
        res.sendStatus(204);
      }
    } catch (err) {
      return res.status(400).json({
        error: { err },
      });
    }
  };

export default {
    createQuote,
    listQuotes,
    getQuoteByID,
    updateQuote,
    calculateQuote,
    removeQuote
}