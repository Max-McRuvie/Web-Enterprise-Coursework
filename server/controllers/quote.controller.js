import Quote from '../models/quote.model.js';

const createQuote = async (req, res) => {
    const quote = new Quote(req.body);
    console.log(quote)
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
}