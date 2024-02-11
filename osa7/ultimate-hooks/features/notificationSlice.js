import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const displayNotificationWithTimeout = (message, timeout) => (dispatch) => {
  dispatch(setNotification(message))

  setTimeout(() => {
    dispatch(clearNotification())
  }, timeout * 1000)
}

export default notificationSlice.reducer
