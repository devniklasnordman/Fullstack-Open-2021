import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, clearNotification } from '../reducers/notificationReducer'

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

    const filteredAnecdotes = state.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filterValue)
    )
    
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })


  const handleVote = (id, content) => {
    dispatch(voteForAnecdote(id))
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
