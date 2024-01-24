const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = [
    { content: 'If it hurts, do it more often', id: getId(), votes: 0},
    { content: 'Adding manpower to a late software project makes it later!', id: getId(), votes: 0},
    { content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', id: getId(), votes: 0},
    { content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', id: getId(), votes: 0},
    { content: 'Premature optimization is the root of all evil.', id: getId(), votes: 0},
    { content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', id: getId(), votes: 0}
]
  

export const voteForAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export const createNewAnecdote = (content) => {
  return {
    type: 'CREATE_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

const reducer = (state = initialState, action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
    case 'VOTE_ANECDOTE': {
      const id = action.data.id
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 }
      )
    }
    case 'CREATE_ANECDOTE': {
      const newAnecdote = { ...action.data }
      return [...state, newAnecdote]
    }
    default:
      return state
  }
}

export default reducer