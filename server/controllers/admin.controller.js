import User from '../models/user.model.js';
import CalculationSettings from '../models/calculationSettings.model.js';
import lodash from 'lodash';
import errorHandler from '../helpers/dbErrorHandler.js';

const updatePaygrade = async (req, res) => {
  const { junior, standard, senior } = req.body;

  const parsedJunior = parseFloat(junior);
  const parsedStandard = parseFloat(standard);
  const parsedSenior = parseFloat(senior);

  const filter = {};
  const update = { $set: { juniorPaygrade: parsedJunior, standardPaygrade: parsedStandard, seniorPaygrade: parsedSenior } };
  const options = { upsert: true };

  try {
    const result = await CalculationSettings.updateOne(filter, update, options);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update pay grades" });
  }
}

const updateFudgeFactor = async (req, res) => {
    const { fudgeFactor } = req.body;

    const filter = {};
    const update = { $set: { fudgeFactor } };
    const options = { upsert: true };

    try {
        const result = await CalculationSettings.updateOne(filter, update, options);
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update fudge factor" });
      }
}


export default {
    updatePaygrade,
    updateFudgeFactor
}