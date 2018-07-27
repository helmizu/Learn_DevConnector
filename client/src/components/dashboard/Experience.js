import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {
  onDeleteClick(id){
    this.props.deleteExperience(id)
  }

  render() {
      const experience = this.props.experience.map(exp =>(
          <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format="DD MMMM YYYY">{exp.from}</Moment> - {exp.current ? 'Current' : (<Moment format="DD MMMM YYYY">{exp.to}</Moment>)}
            </td>
            <td>
                <button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">
                Delete
                </button>
            </td>
          </tr>
      ))
    return (
      <div>
        <h4 className="mb-2">Experience Credentials</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Title</th>
                  <th>Years</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {experience}
              </tbody>
            </table>
          </div>
    )
  }
}

Experience.propTypes = {
    deleteExperience : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  deleteExperience
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Experience))
