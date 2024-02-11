import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './features/blogs/blogSlice'
import notificationReducer from './features/notifications/notificationSlice'

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
  },
})