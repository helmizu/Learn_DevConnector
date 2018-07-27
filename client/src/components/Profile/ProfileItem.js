import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import isEmpty from '../../validation/isEmpty'

export class ProfileItem extends Component {
    static propTypes = {
        prop: PropTypes
    }
    
    render() {
        const { profile } = this.props
        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <img className="rounded-circle" src={profile.user.avatar} alt={profile.user.name} />
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3 className="text-capitalize">{profile.user.name}</h3>
                        <p>{profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}</p>
                        <p>{isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}</p>
                    <Link to={`/profile/${profile.handle}`} className="btn btn-info">View Profile</Link>
                    </div>
                    <div className="col-md-4 d-none d-lg-block">
                        <h4>Skill Set</h4>
                        <ul className="list-group">
                            {profile.skills.slice(0, 2).map((skill, index) => 
                                (
                                    <li key={index} className="list-group-item">
                                    <i className="fa fa-check pr-1"></i>{skill}
                                    </li>
                                )
                            )}
                            {profile.skills.length > 2 ? (
                                <li className="list-group-item">
                                <i className="fa fa-more pr-1"></i>more
                                </li>
                                )
                                :
                                null
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

ProfileItem.propTypes = {
    profile : PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem)
