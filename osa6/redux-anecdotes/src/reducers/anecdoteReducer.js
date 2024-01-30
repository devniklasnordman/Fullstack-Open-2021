import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = [
    { content: 'If it hurts, do it more often', id: getId(), votes: 0},
    { content: 'Adding manpower to a late software project makes it later!', id: getId(), votes: 0},
    { content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', id: getId(), votes: 0},
    { content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', id: getId(), votes: 0},
    { content: 'Premature optimization is the root of all evil.', id: getId(), votes: 0},
    { content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', id: getId(), votes: 0}
]
  

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteForAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote 
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }


  },
})

export const { voteForAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const registerVote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(id)
    dispatch(voteForAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer