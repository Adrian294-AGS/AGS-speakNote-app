import React from 'react'
import { Link } from 'react-router-dom';

function LogInFirst() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-5 text-center" style={{ maxWidth: "400px" }}>
        <h2 className="mb-3">🔒 Access Denied</h2>
        <p className="mb-4 text-muted">
          You need to log in to view this page.
        </p>
        <Link to="/" className="btn btn-primary w-100">
          Go to Login
        </Link>
      </div>
    </div>
  )
}

export default LogInFirst
