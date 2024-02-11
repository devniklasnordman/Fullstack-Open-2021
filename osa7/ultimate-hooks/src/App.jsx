import { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from '../components/Notification'
import { useDispatch } from 'react-redux'
import { displayNotificationWithTimeout } from '../features/notificationSlice'

const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange,
	}
}

const useResource = (baseUrl) => {
	const [resources, setResources] = useState([])

	let token = null

	const setToken = (newToken) => {
		token = `bearer ${newToken}`
	}

	useEffect(() => {
		const getAll = async () => {
			const response = await axios.get(baseUrl)
			setResources(response.data)
		}
		getAll()
	}, [baseUrl])

	const create = async (newObject) => {
		const config = token ? { headers: { Authorization: token } } : {}
		const response = await axios.post(baseUrl, newObject, config)
		setResources(resources.concat(response.data))
	}

	const update = async (id, newObject) => {
		const config = token ? { headers: { Authorization: token } } : {}
		const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
		setResources(
			resources.map((resource) =>
				resource.id === id ? response.data : resource
			)
		)
	}

	const service = {
		update,
		setToken,
		create,
	}

	return [resources, service]
}

const App = () => {
	const content = useField('text')
	const name = useField('text')
	const number = useField('text')
  const dispatch = useDispatch()

	const [notes, noteService] = useResource('http://localhost:3005/notes')
	const [persons, personService] = useResource(
		'http://localhost:3005/persons'
	)

	const handleNoteSubmit = (event) => {
		event.preventDefault()
		noteService.create({ content: content.value })
    dispatch(displayNotificationWithTimeout(`'${content.value}' created`, 5))
	}

	const handlePersonSubmit = (event) => {
		event.preventDefault()
		personService.create({ name: name.value, number: number.value })
    dispatch(displayNotificationWithTimeout(`'${name.value}' added to phonebook`, 5))
	}

	return (
		<div>
      <Notification />
			<h2>notes</h2>
			<form onSubmit={handleNoteSubmit}>
				<input {...content} />
				<button>create</button>
			</form>
			{notes.map((n) => (
				<p key={n.id}>{n.content}</p>
			))}

			<h2>persons</h2>
			<form onSubmit={handlePersonSubmit}>
				name <input {...name} /> <br />
				number <input {...number} />
				<button>create</button>
			</form>
			{persons.map((n) => (
				<p key={n.id}>
					{n.name} {n.number}
				</p>
			))}
		</div>
	)
}

export default App
