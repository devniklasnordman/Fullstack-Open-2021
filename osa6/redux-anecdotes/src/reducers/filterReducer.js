import { createSlice } from '@reduxjs/toolkit'

const filterteSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterReducer(state, action) {
      return action.payload
    }
  }
})

export const { filterReducer } = filterteSlice.actions
export default filterteSlice.reducer