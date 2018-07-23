import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {
  onDeleteClick(id){
    this.props.deleteEducation(id)
  }

  render() {
      const Education = this.props.education.map(edu =>(
          <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format="DD/MM/YYYY">{edu.from}</Moment> - {edu.current ? 'Now' : (<Moment format="DD/MM/YYYY">{edu.to}</Moment>)}
            </td>
            <td>
                <button onClick={this.onDeleteClick.bind(this, edu._id)} className="btn btn-danger">
                Delete
                </button>
            </td>
          </tr>
      ))
    return (
      <div>
        <h4 className="mb-2">Education Credentials</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>School</th>
                  <th>Degree</th>
                  <th>Years</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {Education}
              </tbody>
            </table>
          </div>
    )
  }
}

Education.propTypes = {
    deleteEducation : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  deleteEducation
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Education))
