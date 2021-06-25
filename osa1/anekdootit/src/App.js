import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

function generateRandom(min, max, selected) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (num === selected) ? generateRandom(min, max) : num;
}

function indexOfMax(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const emptyVotes = Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(emptyVotes)
  const [mostVoted, setMostVoted] = useState(0)


  const setNext = (selected) => {
    const next = generateRandom(0, 6, selected)
    setSelected(next)
    
  }

  const setToVotes = (newValue) => {
    const copy = [...votes]
    copy[newValue] += 1     
    setVotes(copy)
    let highestIndex = indexOfMax(copy)
    setMostVoted(highestIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br></br>
      has {votes[selected]} votes<br></br>
      <Button handleClick={() => setToVotes(selected)} text="vote" />
      <Button handleClick={() => setNext(selected)} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVoted]}<br></br>
      has {votes[mostVoted]} votes

    </div>
  )
}

export default App