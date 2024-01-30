import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id) => {
  // Fetch the specific anecdote
  const response = await axios.get(`${baseUrl}/${id}`)
  const anecdoteToChange = response.data

  // Update the votes count
  const changedAnecdote = { 
    ...anecdoteToChange, 
    votes: anecdoteToChange.votes + 1 
  }

  // Send the updated anecdote back to the server
  const updatedResponse = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  return updatedResponse.data
}


export default { getAll, createNew, voteAnecdote }