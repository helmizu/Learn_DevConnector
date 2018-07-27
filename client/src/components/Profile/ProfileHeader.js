import React, { Component } from 'react'

class ProfileHeader extends Component {
  render() {
      const { profile } = this.props
    return (
        <div className="row">
            <div className="col-md-12">
            <div className="card card-body text-primary mb-3">
                <div className="row">
                <div className="col-4 col-md-3 m-auto">
                    <img className="rounded-circle" src={profile.user.avatar} alt={profile.name} />
                </div>
                </div>
                <div className="text-center">
                <h1 className="display-4 text-center text-capitalize">{profile.user.name}</h1>
                <p className="lead text-center">{profile.status} {profile.company ? `at ${profile.company}` : '-'}</p>
                <p>{profile.location ? profile.location : "-"}</p>
                <p>
                    <a className="text-white p-2" href={profile.social.youtube} target="_blank">
                    <i className="fab fa-youtube fa-2x" style={{ color : "#ff0000" }}></i>
                    </a>
                    <a className="text-white p-2" href={profile.social.twitter} target="_blank">
                    <i className="fab fa-twitter fa-2x" style={{ color : "#1da1f2" }}></i>
                    </a>
                    <a className="text-white p-2" href={profile.social.facebook} target="_blank">
                    <i className="fab fa-facebook fa-2x" style={{ color : "#3B5998" }}></i>
                    </a>
                    <a className="text-white p-2" href={profile.social.linkedin} target="_blank">
                    <i className="fab fa-linkedin fa-2x" style={{ color : "#0077B5" }}></i>
                    </a>
                    <a className="text-white p-2" href={profile.social.instagram} target="_blank">
                    <i className="fab fa-instagram fa-2x rounded px-1" style={{ background: "linear-gradient( #400080, transparent), linear-gradient(200deg, #d047d1, #ff0000, #ffff00)", backgroundClip : "text", WebkitTextFillColor : "transparent" }}></i>
                    </a>
                </p>
                </div>
            </div>
            </div>
        </div>
    )
  }
}

export default ProfileHeader
