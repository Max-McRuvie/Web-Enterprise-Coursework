import User from './models/user.model.js';

const baseAdmin = async () => {
    const admin = new User({
        name: "admin",
        email: "admin@a.com",
        password: "admin123",
        admin: true,

    })
    await admin.save()
}

const baseUser = async () => {
    const user = new User({
        name: "user",
        email: "user@u.com",
        password: "user123",
        admin: false,
    })
    await user.save()
}

const populateDB = async () => {
    await baseAdmin()
    await baseUser()
}

export default populateDB