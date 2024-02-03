import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch() 

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    event.target.anecdote.value = ''
    if (content.length < 5) {
      dispatchNotification({ 
        type: 'TOO_SHORT', 
        message: 'Too short anecdote, must have length 5 or more' 
      })
    } else {
      newAnecdoteMutation.mutate({ content, votes: 0 }, {
        onSuccess: () => {
          dispatchNotification({ type: 'CREATE', message: `Anecdote "${content}" created` })
        }
      })
    }  
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
