import { useEffect } from 'react'
import { useNotificationValue, useNotificationDispatch } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  const dispatchNotification = useNotificationDispatch()

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification, dispatchNotification])

  if (!notification) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
