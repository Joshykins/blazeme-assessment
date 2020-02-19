import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {
  return (
    <div className="container">
      <div className="row"><h5>404, Page Not Found</h5>
      <p>Go back to <Link to="/">safety!</Link></p>
      </div>
    </div>
  )
}

export default NotFound