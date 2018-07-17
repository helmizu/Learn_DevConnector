const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateLoginInput(data) {
    let errors = {};
    
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid'
    }
    
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is Required'
    }
    
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is Required'
    }
    
    return {
        errors,
        isValid : isEmpty(errors)
    }
}