
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Router } from 'react-router'
import Redirect from '../../../node_modules/react-router/Redirect';

const PrivateRouter = ({component : Component, auth, ...rest}) => {
    return (
        <div>
            <Route {...rest} render = {props => auth.isAuthenticated === true ? (<Component {...props} />) : (<Redirect to="/login" />)} />
        </div>
    )
}

PrivateRouter.propTypes = {
    auth : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth
})

export default connect(mapStateToProps)(PrivateRouter)
