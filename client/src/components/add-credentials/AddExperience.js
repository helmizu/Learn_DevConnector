import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addExperience } from '../../actions/profileActions'

class AddExperience extends Component {
    constructor(props) {
        super(props)
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false 
        }
        this.onChange = this.onChange.bind(this)
        this.onCheck = this.onCheck.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }
    
    onSubmit(e) {
        e.preventDefault()
        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }

        this.props.addExperience(expData, this.props.history)
    }
    render() {
        const { errors } = this.state
        
        return (
            <div className="section add-experience">
            <div className="container">
            <div className="row">
            <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
            Go Back
            </Link>
            <h1 className="display-4 text-center">Add Your Experience</h1>
            <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
            <small className="d-block pb-3">* = required field</small>
            <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup 
            placeholder="* Company"
            name="company"
            value={this.state.company}
            onChange={this.onChange}
            error={errors.company}
            />  
            <TextFieldGroup 
            placeholder="* Job Title"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
            error={errors.title}
            />    
            <TextFieldGroup 
            placeholder="Location"
            name="location"
            value={this.state.location}
            onChange={this.onChange}
            error={errors.location}
            />  
            <h6>* From Date</h6>
            <TextFieldGroup 
            name="from"
            type="date"
            value={this.state.from}
            onChange={this.onChange}
            error={errors.from}
            />  
            <h6>To Date</h6>
            <TextFieldGroup 
            name="to"
            type="date"
            value={this.state.to}
            onChange={this.onChange}
            error={errors.to}
            disabled={this.state.disabled ? 'disabled' : ''}
            />  
            <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" name="current" checked={this.state.current} value={this.state.current} onChange={this.onCheck} id="current" />
            <label className="form-check-label" htmlFor="current">
            Current Job
            </label>
            </div>
            <TextAreaFieldGroup 
            placeholder="Job Description"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
            info="Tell us about the position"
            />
            <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
            </div>
            </div>
            </div>
            </div>
        )
    }
}
AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    profile : state.profile,
    errors : state.errors
})

const mapDispatchToProps = {
    addExperience
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience))
