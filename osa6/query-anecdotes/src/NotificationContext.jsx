import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "CREATE":
        return action.message
      case "VOTE":
          return action.message
      case "TOO_SHORT":
        return action.message
      case "CLEAR_NOTIFICATION":
          return ''
      default:
          return state
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
  }

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}
  

export default NotificationContext