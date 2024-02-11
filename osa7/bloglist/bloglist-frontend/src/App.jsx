import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
	const [blogFormVisible, setBlogFormVisible] = useState(false)
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationClass, setNotificationClass] = useState('error')
	const [successMessage, setSuccessMessage] = useState(null)
	const [successClass, setSuccessClass] = useState('blog')

	useEffect(() => {
		blogService
			.getAll()
			.then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const blogFormRef = useRef()

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility()

		blogService
			.create(blogObject)
			.then((returnedBlog) => {
				setBlogs(blogs.concat(returnedBlog))

				setSuccessMessage(
					`a new blog ${blogObject.title} by ${blogObject.author} added`
				)
				setSuccessClass('blog')
				setTimeout(() => {
					setSuccessMessage(null)
					setSuccessClass('success')
				}, 3000)
			})
			.catch((error) => {
				setErrorMessage('Failed to a add a new blog')
				setNotificationMessage('Failed to a add a new blog')
				setNotificationClass('error')
				setTimeout(() => {
					setNotificationMessage(null)
					setNotificationClass('notification')
					setErrorMessage(null)
				}, 3000)
			})
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					id="username"
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					id="password"
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button id="login-button" type="submit">
				login
			</button>
		</form>
	)

	const handleBlogChange = (event) => {
		const { name, value } = event.target
		if (name === 'title') {
			setTitle(value)
		} else if (name === 'author') {
			setAuthor(value)
		} else if (name === 'url') {
			setUrl(value)
		}
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem(
				'loggedBlogappUser',
				JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('wrong username or password')
			setNotificationMessage(`wrong username or password`)
			setNotificationClass('error')
			setTimeout(() => {
				setNotificationMessage(null)
				setNotificationClass('notification')
				setErrorMessage(null)
			}, 5000)
		}
		console.log('logging in with', username, password)
	}

	const handleLogOut = () => {
		setUser(null)
	}

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification
					message={notificationMessage}
					className={notificationClass}
				/>
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type="text"
							value={username}
							name="Username"
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						password
						<input
							type="password"
							value={password}
							name="Password"
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type="submit">login</button>
				</form>
			</div>
		)
	}

	const renderBlogForm = () => (
		<Togglable buttonLabel="new blog" ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	)

	return (
		<div>
			<h2>blogs</h2>

			<Notification message={successMessage} className={successClass} />
			<p>
				{user.name} logged in{' '}
				<button type="submit" onClick={handleLogOut}>
					logout
				</button>
			</p>
			{renderBlogForm()}
			{blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					setBlogs={setBlogs}
					user={user}
				/>
			))}
		</div>
	)
}

export default App
