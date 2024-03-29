import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileAbout from './ProfileAbout'
import ProfileHeader from './ProfileHeader'
import ProfileCreds from './ProfileCreds'
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions'

class Profile extends Component {
    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle)
            
        }
    }
    
    render() {
        const { profile, loading } = this.props.profile
        let profileContent;

        if(profile === null || loading) {
            profileContent = <Spinner />
        } else {
            profileContent = (
            <div>
                <ProfileHeader profile={profile} />
                <ProfileAbout profile={profile} />
                <ProfileCreds profile={profile} />
            </div>
            )
        }
        
        return (
            <div className="profile">
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <div className="row">
                        <div className="col-6">
                        <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                        </div>
                        <div className="col-6">

                        </div>
                    </div>
                    {profileContent}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    getProfileByHandle : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile : state.profile
})

const mapDispatchToProps = {
    getProfileByHandle
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
