import React from 'react'

function Loading() {
  return (
    <div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "30vh", marginTop: "10%" }}
      >
        <div
          className="spinner-border text-primary mb-3"
          style={{ width: "4rem", height: "4rem" }}
        ></div>
        <h5 className="fw-bold text-primary">Please wait...</h5>
      </div>
    </div>
  )
}

export default Loading
