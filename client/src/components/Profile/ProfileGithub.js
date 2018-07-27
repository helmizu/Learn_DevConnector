import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios';

class ProfileGithub extends Component {
    constructor(props) {
        super(props)

        this.state = {
            clientId : '78fe7a26d413631752501dd6b044ec59e3f40cfc7295a394452f771b7d5e50e6',
            clientSecret : '3686d8fc18e5b1bfb7c2de78ba919f66958da9b70d5389935c17255e65b32599',
            count : 5,
            sort : 'created: asc',
            repos : []
        }
    }
    componentDidMount() {
      const { username } = this.props
      const { count, sort, clientId, clientSecret } = this.state
    }
    
    render() {
        const  repo  = {}
        return (
            <div ref="myRef">
            <hr />
            <h3 className="mb-4">Latest Github Repos</h3>
            <div key={repo.id} className="card card-body mb-2">
            <div className="row">
            <div className="col-md-6">
            <h4>
            <Link to={repo.html_url} className="text-info" target="_blank"> Repository One</Link>
            </h4>
            <p>Repository description</p>
            </div>
            <div className="col-md-6">
            <span className="badge badge-info mr-1">
            Stars: 44
            </span>
            <span className="badge badge-secondary mr-1">
            Watchers: 21
            </span>
            <span className="badge badge-success">
            Forks: 122
            </span>
            </div>
            </div>
            </div>
            </div>
        )
    }
}

export default ProfileGithub
