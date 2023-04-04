import validator from "validator";

const validatePassword = (password, isSignin) => {
    if(!password && isSignin){
        return "Password is required"
    }

    if(password.length < 8 && !isSignin){
        return "Password must be at least 8 characters long";
    }

    if(!validator.isStrongPassword(password) && !isSignin){
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

const validateTitle = (title) => {
    if(!title){
        return "Title is required"
    }

    if(title.length < 3){
        return "Title must be at least 3 characters long";
    }

    return "";
}
    

export { validatePassword, validateEmail, validateTitle }


