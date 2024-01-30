import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerVote } from '../reducers/anecdoteReducer'
import { createNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const Anecdote = ({ anecdote, handleVote }) => (
  <div key={anecdote.id}>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleVote}>vote</button>
    </div>
  </div>
);

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    const filterValue = state.filter.toLowerCase()

    return state.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(filterValue))
      .sort((a, b) => b.votes - a.votes)
  })


  const handleVote = (id, content) => {
    dispatch(registerVote(id))
    dispatch(createNotification(`You voted '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(anecdote.id, anecdote.content)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList;
