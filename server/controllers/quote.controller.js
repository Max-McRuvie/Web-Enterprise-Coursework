import Quote from '../models/quote.model.js';
import CalculationSettings from '../models/calculationSettings.model.js';

const fudgeFactorCalculator = (amount) => {
    let fudgeFactor = 1.5;

    return amount * fudgeFactor;
}

const calculateQuote = async (req, res) => {
    const projectInfo = req.body;
    
    // fetch paygrades from the database
    let paygrades;
    try {
        paygrades = await CalculationSettings.findOne();
        paygrades = { junior: paygrades.juniorPaygrade, standard: paygrades.standardPaygrade, senior: paygrades.seniorPaygrade };
    } catch (error) {
        console.error(error);
        // if there's an error fetching paygrades from the database, use the default values
        paygrades = { junior: 10, standard: 15, senior: 20 };
    }

    let totalLaborCost = 0;
    for (let i = 0; i < projectInfo.workers.length; i++) {
        const worker = projectInfo.workers[i];
        switch (worker.hourlyRate) {
            case "Junior":
                worker.hourlyRate = paygrades.junior;
                break;
            case "Standard":
                worker.hourlyRate = paygrades.standard;
                break;
            case "Senior":
                worker.hourlyRate = paygrades.senior;
                break;
            default:
                worker.hourlyRate = 0;
        }
        const workerCost = worker.hourlyRate * fudgeFactorCalculator(worker.hoursRequired);
        totalLaborCost += Number(workerCost);
    }

    for(let i = 0; i < projectInfo.physicalResources.length; i++) {
        const resource = projectInfo.physicalResources[i];
        totalLaborCost += Number(resource.cost);
    }

    let finalQuote = {
        totalCost: Math.round(totalLaborCost)
    }

    return res.status(200).json({
        finalQuote
    })
}
    

const createQuote = async (req, res) => {
    // Sanitize quote data
    const quote = new Quote({
        uID: req.body.uID,
        title: req.body.title.replace(/[^a-zA-Z0-9\s+]/g, ''),
        manHours: req.body.manHours.replace(/[^0-9]/g, ''),
        workers: req.body.workers.map((worker) => {
            const name = worker.name.replace(/[^a-zA-Z\s]/g, '');
            const hourlyRate = worker.hourlyRate;
            const hoursRequired = worker.hoursRequired.replace(/[^0-9]/g, '');
            return { name, hourlyRate, hoursRequired };
        }),
        physicalResources: req.body.physicalResources.map((resource) => {
            const title = resource.title.replace(/[^a-zA-Z\s]/g, '');
            const cost = resource.cost.replace(/[^0-9.]/g, '');
            return { title, cost };
        }),
        total_cost: req.body.total_cost,
    });

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

const combineQuotes = async (req, res) => {
  try {
    const ids = req.body.quoteIds;
    const quotes = await Quote.find({_id : {$in : ids}});

    const titles = quotes.map(quote => quote.title);
    const combinedTitles = titles.join(' + ');

    const combinedManHours = quotes.reduce((acc, curr) => {
        return acc + curr.manHours;
    }, 0);

    const combinedWorkers = quotes.reduce((acc, curr) => {
        // Combine the workers of each quote into one array
        return acc.concat(curr.workers);
    }, []);
    
    const combinedPhysicalResources = quotes.reduce((acc, curr) => {
        // Combine the physical resources of each quote into one array
        return acc.concat(curr.physicalResources);
    }, []);

    const combinedTotalCost = quotes.reduce((acc, curr) => {
        // Combine the total costs of each quote into one number
        return acc + curr.total_cost;
    }, 0);

    const combinedQuote = {
        title: combinedTitles,
        manHours: combinedManHours,
        workers: combinedWorkers,
        physicalResources: combinedPhysicalResources,
        total_cost: combinedTotalCost
    };
    res.json(combinedQuote);
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

const listQuotes = async (req, res) => {
    try {
        const id = req.params.userId
        let quotes = await Quote.find({uID : id})
        res.json(quotes);
    } catch (err) {
        return res.status(400).json({
            error: {err}
        })
    }
}

const updateQuote = async (req, res) => {
    // Sanitize quote data
    try{
        let id = req.params.quoteId
        const quote = req.body;      

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
        const userId = req.params.userId;
        const quoteIds = req.body.quoteIds;

        if (!userId || !quoteIds) {
            return res.status(400).json({
                error: 'Missing id or userId parameter'
            });
        }

        if (Array.isArray(quoteIds)) {
            await Quote.deleteMany({ _id: { $in: quoteIds }, uID: userId });
        } else {
            await Quote.deleteOne({ _id: quoteIds, uID: userId });
        }

        res.sendStatus(204);
    } catch (err) {
        console.error('Error deleting quote:', err);
        return res.status(500).json({
            error: 'An error occurred while deleting the quote'
        });
    }
  };

export default {
    createQuote,
    listQuotes,
    getQuoteByID,
    combineQuotes,
    updateQuote,
    calculateQuote,
    removeQuote
}