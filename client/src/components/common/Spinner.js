import React from 'react'
import spinner from '../common/spinner.gif';

export default () => {
  return (
    <div>
    <img src={spinner} style={{width: '200px', margin: 'auto', display: 'block', filter: 'grayscale(100%)'}} alt="loading" />
    </div>
  )
}
