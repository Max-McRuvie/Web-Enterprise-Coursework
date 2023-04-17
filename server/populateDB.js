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

    try{
        await user.save()
    } catch(err) {
        console.log("Base user already added")
    }
}

// Populates DB with base calculation settings
const baseCalculationSettings = async () => {
    const calculationSettings = new CalculationSettings({
        juniorPaygrade: 10,
        standardPaygrade: 15,
        seniorPaygrade: 20,
    })

    try{
        await calculationSettings.save()
    } catch(err) {
        console.log("Base calculation settings already added")
    }
}


// Populates DB with base admin and user
const populateDB = async () => {
    await baseAdmin()
    await baseUser()
    await baseCalculationSettings()
}

// Export
export default populateDB