import User from './models/user.model.js';
import CalculationSettings from './models/calculationSettings.model.js';

// Populates DB with base admin
const baseAdmin = async () => {
    const admin = new User({
        name: "admin",
        email: "admin@a.com",
        password: "admin123",
        admin: true,

    })

    // Save admin
    try{
        await admin.save()
    } catch(err) {
        console.log("Base admin already added")
    }
}

// Populates DB with base user
const baseUser = async () => {
    const user = new User({
        name: "user",
        email: "user@u.com",
        password: "user123",
        admin: false,
    })

    // Save user
    try{
        await user.save()
    } catch(err) {
        console.log("Base user already added")
    }
}

// Populates DB with base calculation settings
const baseCalculationSettings = async () => {
    // Check if calculation settings already exist
    const existingSettings = await CalculationSettings.findOne()
  
    if (existingSettings) {
      console.log("Base calculation settings already added")
      return
    }
  
    // Create new calculation settings
    const calculationSettings = new CalculationSettings({
      juniorPaygrade: 10,
      standardPaygrade: 15,
      seniorPaygrade: 20,
    })
  
    await calculationSettings.save()
  }


// Populates DB with base admin and user
const populateDB = async () => {
    await baseAdmin()
    await baseUser()
    await baseCalculationSettings()
}

// Export
export default populateDB