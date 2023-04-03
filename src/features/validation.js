import validator from "validator";

const validatePassword = (password) => {
    if(!password){
        return "Password is required"
    }

    if(password.length < 8){
        return "Password must be at least 8 characters long";
    }

    if(!validator.isStrongPassword(password)){
        return "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
    }

    return "";
}

const validateEmail = (email) => {
    if(!email){
        return "Email is required"
    }

    if(!validator.isEmail(email)){
        return "Email is invalid";
    }

    return "";
}

export { validatePassword, validateEmail }


