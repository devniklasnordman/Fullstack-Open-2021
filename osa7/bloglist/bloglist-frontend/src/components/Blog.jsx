import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) => {
	const [detailsVisible, setDetailsVisible] = useState(false)

	const toggleDetails = () => {
		setDetailsVisible(!detailsVisible)
	}

	const handleLike = async () => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }

		try {
			await blogService.update(blog.id, updatedBlog)
			setBlogs((currentBlogs) =>
				currentBlogs.map((b) => (b.id === blog.id ? updatedBlog : b))
			)
		} catch (error) {
			console.error('Blog like update error:', error)
		}
		console.log('After update: ', blog)
	}

	const handleDelete = async () => {
		if (window.confirm(`Delete blog ${blog.title}?`)) {
			try {
				await blogService.remove(blog.id)
				setBlogs((currentBlogs) =>
					currentBlogs.filter((b) => b.id !== blog.id)
				)
			} catch (error) {
				console.log('Blog delete error:', error)
			}
		}
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const detailsStyle = {
		marginTop: 10,
		paddingLeft: 20,
	}

	return (
		<div style={blogStyle}>
			<div>
				<strong>{blog.title}</strong> by {blog.author}
				<button onClick={toggleDetails}>
					{detailsVisible ? 'hide' : 'view'}
				</button>
			</div>
			{detailsVisible && (
				<div style={detailsStyle}>
					<div>{blog.url}</div>
					<div>
						likes <span className="likes">{blog.likes}</span>{' '}
						<button id="like-button" onClick={handleLike}>
							like
						</button>
					</div>
					<div>added by {blog.user.name}</div>
					{user &&
						blog.user &&
						user.username === blog.user.username && (
							<button onClick={handleDelete}>delete</button>
						)}
					<button onClick={toggleDetails}>hide</button>
				</div>
			)}
		</div>
	)
}

export default Blog
