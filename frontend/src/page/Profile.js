import React from 'react'
import { useParams } from 'react-router-dom';

function Profile() {
  const { Id } = useParams();

  return (
    <div>
      {Id}
    </div>
  )
}

export default Profile
