import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="bg-dark text-white mt-5 p-4 text-center footer">
        Copyright &copy; {new Date().getFullYear()} Tumblir Connector
      </footer>
    )
  }
}
