import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	BlogForm.propTypes = {
		setTitle: PropTypes.func.isRequired,
		setAuthor: PropTypes.func.isRequired,
		setUrl: PropTypes.func.isRequired,
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
	}

	const addBlog = (event) => {
		event.preventDefault()
		const blogObject = {
			title: title,
			author: author,
			url: url,
		}

		createBlog(blogObject)

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<form onSubmit={addBlog}>
				title:
				<input
					placeholder="Enter title"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				author:
				<input
					placeholder="Enter author"
					value={author}
					onChange={(event) => setAuthor(event.target.value)}
				/>
				url:
				<input
					placeholder="Enter URL"
					value={url}
					onChange={(event) => setUrl(event.target.value)}
				/>
				<button type="submit">save</button>
			</form>
		</div>
	)
}

export default BlogForm
