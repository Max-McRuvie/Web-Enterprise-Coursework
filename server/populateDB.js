import User from './models/user.model.js';

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

// Populates DB with base admin and user
const populateDB = async () => {
    await baseAdmin()
    await baseUser()
}

// Export
export default populateDB