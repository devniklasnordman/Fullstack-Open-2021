import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

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


  const handleVote = (id) => {
    dispatch(voteForAnecdote(id))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(anecdote.id)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList;
