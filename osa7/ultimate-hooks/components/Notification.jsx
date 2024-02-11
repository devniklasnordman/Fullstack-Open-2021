import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log(notification)

  if (!notification) return null

  return (
    <div style={{ border: '1px solid green', padding: 10, marginBottom: 10 }}>
      {notification}
    </div>
  )
}

export default Notification