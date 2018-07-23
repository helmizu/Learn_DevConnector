import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/isEmpty';

class EditProfile extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            displaySocialInputs: false,
            handle : '',
            company :'',
            website : '',
            location : '',
            status : '',
            skills : '',
            github : '',
            bio : '',
            youtube : '',
            twitter : '',
            facebook : '',
            linkedin : '',
            instagram : '',
            errors : {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    componentDidMount() {
        this.props.getCurrentProfile();
    }
    
    
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }

        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile

            //Bring skills array back to csv
            const skillsCSV = profile.skills.join(',')

            // if profile field doesn't exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : ''
            profile.website = !isEmpty(profile.website) ? profile.website : ''
            profile.location = !isEmpty(profile.location) ? profile.location : ''
            profile.github = !isEmpty(profile.github) ? profile.github : ''
            profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
            profile.social = !isEmpty(profile.social) ? profile.social : {}
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ''
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ''
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''
            
            //setstate
            this.setState({
                handle : profile.handle,
                company :profile.company,
                website : profile.website,
                location : profile.location,
                status : profile.status,
                skills : skillsCSV,
                github : profile.github,
                bio : profile.bio,
                youtube : profile.youtube,
                twitter : profile.twitter,
                facebook : profile.facebook,
                linkedin : profile.linkedin,
                instagram : profile.instagram
            })
        }
    }
    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    onSubmit(e) {
        e.preventDefault()
        const profileData = {
            handle : this.state.handle,
            company : this.state.company,
            website : this.state.website,
            location : this.state.location,
            status : this.state.status,
            skills : this.state.skills,
            github : this.state.github,
            bio : this.state.bio,
            youtube : this.state.youtube,
            twitter : this.state.twitter,
            facebook : this.state.facebook,
            linkedin : this.state.linkedin,
            instagram : this.state.instagram
        }
        
        this.props.createProfile(profileData, this.props.history)
    }
    
    render() {
        const { errors, displaySocialInputs } = this.state
        
        let socialInputs
        
        if(displaySocialInputs) {
            socialInputs = (
                <div>
                <InputGroup 
                placeholder="Twitter Profile URL"
                name="twitter"
                icon="fab fa-twitter"
                value={this.state.twitter}
                onChange={this.onChange}
                error={errors.twitter}
                />
                <InputGroup 
                placeholder="Facebook Page URL"
                name="facebook"
                icon="fab fa-facebook"
                value={this.state.facebook}
                onChange={this.onChange}
                error={errors.facebook}
                />
                <InputGroup 
                placeholder="Linkedin Profile URL"
                name="linkedin"
                icon="fab fa-linkedin"
                value={this.state.linkedin}
                onChange={this.onChange}
                error={errors.linkedin}
                />
                <InputGroup 
                placeholder="Youtube Channel URL"
                name="youtube"
                icon="fab fa-youtube"
                value={this.state.youtube}
                onChange={this.onChange}
                error={errors.youtube}
                />
                <InputGroup 
                placeholder="Instagram Page URL"
                name="instagram"
                icon="fab fa-instagram"
                value={this.state.instagram}
                onChange={this.onChange}
                error={errors.instagram}
                />
                
                </div>
            )
        } else {
            
        }
        const options = [
            { label : '* Select Professional Status', value : 0},
            { label : 'Developer', value : 'Developer'},
            { label : 'Junior Developer', value : 'Junior Developer'},
            { label : 'Senior Developer', value : 'Senior Developer'},
            { label : 'Manager', value : 'Manager'},
            { label : 'Student or Learning', value : 'Student or Learning'},
            { label : 'Teacher or Instructor', value : 'Teacher or Instructor'},
            { label : 'Intern', value : 'Intern'},
            { label : 'Other', value : 'Other'}
        ]
        
        return (
            <div className="create-profile">
            <div className="container">
            <div className="row">
            <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Your Profile</h1>
            <small className="d-block pb-3">* = required field</small>
            <form noValidate onSubmit={this.onSubmit} >
            <TextFieldGroup 
            placeholder="* Profile Handle"
            name="handle"
            value={this.state.handle}
            onChange={this.onChange}
            error={errors.handle}
            info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)" 
            />
            <SelectListGroup 
            name="status"
            value={this.state.status}
            onChange={this.onChange}
            options={options}
            error={errors.status}
            info="Give us an idea of where you are at in your career"
            />
            <TextFieldGroup 
            placeholder="Company"
            name="company"
            value={this.state.company}
            onChange={this.onChange}
            error={errors.company}
            info="Could be your own company or one you work for" 
            />
            <TextFieldGroup 
            placeholder="Website"
            name="website"
            value={this.state.website}
            onChange={this.onChange}
            error={errors.website}
            info="Could be your own or a company website" 
            />
            <TextFieldGroup 
            placeholder="Location"
            name="location"
            value={this.state.location}
            onChange={this.onChange}
            error={errors.location}
            info="City & state suggested (eg. Boston, MA)" 
            />
            <TextFieldGroup 
            placeholder="* Skills"
            name="skills"
            value={this.state.skills}
            onChange={this.onChange}
            error={errors.skills}
            info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)" 
            />
            <TextFieldGroup 
            placeholder="Github"
            name="github"
            value={this.state.github}
            onChange={this.onChange}
            error={errors.github}
            info="If you want your latest repos and a Github link, include your username" 
            />
            <TextAreaFieldGroup 
            placeholder="A short bio of yourself"
            name="bio"
            value={this.state.bio}
            onChange={this.onChange}
            error={errors.bio}
            info="Tell us a little about yourself" 
            />
            <div className="mb-3">
            <button type="button" onClick={() => {
                this.setState(prevState => ({
                    displaySocialInputs : !prevState.displaySocialInputs
                }))
            }} className="btn btn-light">Add Social Network Links</button>
            <span className="text-muted">Optional</span>
            </div>
            
            {socialInputs}
            <input type="submit" className="btn btn-info btn-block mt-4" value="Submit" />
            </form>
            </div>
            </div>
            </div>
            </div>
            
        )
    }
}

EditProfile.propTypes = {
    createProfile : PropTypes.func.isRequired,
    getCurrentProfile : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile : state.profile,
    errors : state.errors
})

const mapDispatchToProps = {
    createProfile, getCurrentProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile))
