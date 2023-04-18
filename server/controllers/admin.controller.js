import CalculationSettings from '../models/calculationSettings.model.js';

const getPaygrades = async (req, res) => {
    try {
        const paygrades = await CalculationSettings.findOne();
        res.json({ junior: paygrades.juniorPaygrade, standard: paygrades.standardPaygrade, senior: paygrades.seniorPaygrade });
    } catch (error) {
        res.json({ junior: 10, standard: 15, senior: 20 })
    }
}

const updatePaygrade = async (req, res) => {
  const { junior, standard, senior } = req.body;

  const parsedJunior = parseFloat(junior);
  const parsedStandard = parseFloat(standard);
  const parsedSenior = parseFloat(senior);

  const filter = {};
  const update = { $set: { juniorPaygrade: parsedJunior, standardPaygrade: parsedStandard, seniorPaygrade: parsedSenior } };

  try {
    const result = await CalculationSettings.updateOne(filter, update);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update pay grades" });
  }
}

const calculateWithoutFudgeFactor = async (req, res) => {
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
      const workerCost = worker.hourlyRate * worker.hoursRequired;
      totalLaborCost += Number(workerCost);
  }

  for(let i = 0; i < projectInfo.physicalResources.length; i++) {
      const resource = projectInfo.physicalResources[i];
      totalLaborCost += Number(resource.cost);
  }

  let finalQuote = {
      totalCost: Number(totalLaborCost)
  }


  return res.status(200).json({
      finalQuote
  })
}


export default {
    getPaygrades,
    updatePaygrade,
    calculateWithoutFudgeFactor
}