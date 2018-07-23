import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange,
}) => {
    return (  
        <div className="input-group mt-2">
        <div className="input-group-prepend" >
            <span className="input-group-text text-center" style={{width:'45px'}} >
                <i className={icon} />
            </span>
        </div>
        <input
        className={classnames("form-control form-control-lg", { 'is-invalid': error } )} 
        placeholder={placeholder} 
        name={name} 
        type={type}
        value={value} 
        onChange={onChange} />
        {error && (
            <div className="invalid-feedback">
            {error}
            </div>
        )}
        </div>
    )
}

InputGroup.propTypes = {
    name : PropTypes.string.isRequired,
    value : PropTypes.string.isRequired,
    icon : PropTypes.string,
    placeholder : PropTypes.string,
    type : PropTypes.string.isRequired,
    error : PropTypes.string,
    onChange : PropTypes.func.isRequired
}

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup