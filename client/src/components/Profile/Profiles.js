import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import { getProfiles } from '../../actions/profileActions'
import ProfileItem from './ProfileItem';

export class Profiles extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        this.props.getProfiles()
    }
    
    render() {
        const { profiles, loading } = this.props.profile
        let profileItems

        if (profiles === null || loading) {
            profileItems = <Spinner />
        } else {
            if (profiles.length > 0) {
                profileItems = profiles.map(profile => (<ProfileItem key={profile._id} profile={profile}/>))
            } else {
                profileItems = (<h4>No Profiles Found</h4>)
            }
        }
        return (
            <div class="profiles">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                <h1 class="display-4 text-center">Developer Profiles</h1>
                <p class="lead text-center">Browse and connect with developers</p>
                {profileItems}
                </div>
              </div>
            </div>
            </div>
        )
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile : state.profile
})

const mapDispatchToProps = {
    getProfiles
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
