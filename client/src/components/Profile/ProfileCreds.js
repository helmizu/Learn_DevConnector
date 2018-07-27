import React, { Component } from 'react'
import Moment from '../../../node_modules/react-moment';

class ProfileCreds extends Component {
    render() {
        const { profile } = this.props
        return (
            <div className="row">
            <div className="col-md-6">
            <h3 className="text-center text-info">Experience</h3>
            <ul className="list-group">
            {profile.experience.map(exp => (
                <li className="list-group-item" key={exp.company}>
                <h4>{exp.company}</h4>
                <p><Moment format="DD MMMM YYYY">{exp.from}</Moment> - {exp.current ? "Current" : (<Moment format="DD MMMM YYYY">{exp.to}</Moment>)}</p>
                <p>
                <strong>Position:</strong> {exp.title}
                </p>
                <p>
                <strong>Description:</strong> {exp.description}</p>
                </li>
            ))}
            </ul>
            </div>
            <div className="col-md-6">
            <h3 className="text-center text-info">Education</h3>
            <ul className="list-group">
            {profile.education.map(edu => (
                <li className="list-group-item" key={edu.school}>
                <h4>{edu.school}</h4>
                <p><Moment format="DD MMMM YYYY">{edu.from}</Moment> - {edu.current ? "Current" : (<Moment format="DD MMMM YYYY">{edu.to}</Moment>)}</p>
                <p>
                <strong>Degree: </strong>{edu.degree}
                </p>
                <p>
                <strong>Field Of Study: </strong>{edu.fieldofstudy}
                </p>
                <p>
                <strong>Description:</strong> {edu.description ? edu.description : "-"}
                </p>
                </li>
            ))}
            </ul>
            </div>
            </div>
        )
    }
}

export default ProfileCreds
