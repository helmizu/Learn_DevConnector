const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput(data) {
    let errors = {};
    
    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    if(!Validator.isLength(data.name, {min : 2, max : 30})){
        errors.name = 'Name must be between 2 and 30 characters'
    }
    
    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is Required'
    }
    
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid'
    }
    
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is Required'
    }
    
    if(!Validator.isLength(data.password, {min : 5, max : 30})){
        errors.password = 'Password must be between 5 and 30 characters'
    }
    
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is Required'
    }
    
    if(!Validator.isLength(data.password2, {min : 5, max : 30})){
        errors.password2 = 'Confirm Password must be between 5 and 30 characters'
    }
    
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Passwords must match'
    }
    
    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm Password field is Required'
    }
    
    return {
        errors,
        isValid : isEmpty(errors)
    }
}