import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
    const blogs = await blogService.getAll()
    return blogs
})

export const addBlog = createAsyncThunk('blogs/addBlog', async (newBlog) => {
    const response = await blogService.create(newBlog)
    return response
})

const blogSlice = createSlice({
    name: 'blogs',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
      },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBlogs.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(fetchBlogs.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.items = action.payload
          })
          .addCase(fetchBlogs.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
          .addCase(addBlog.fulfilled, (state, action) => {
            state.items.push(action.payload)
          })
    },
})

export default blogSlice.reducer