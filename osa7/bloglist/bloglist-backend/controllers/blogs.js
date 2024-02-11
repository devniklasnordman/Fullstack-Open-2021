const router = require('express').Router()
const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

	response.json(blogs)
})

router.post('/', userExtractor, async (request, response) => {
	const { title, author, url, likes } = request.body
	const blog = new Blog({
		title,
		author,
		url,
		likes: likes ? likes : 0,
	})

	const user = request.user

	if (!user) {
		return response.status(401).json({ error: 'operation not permitted' })
	}

	blog.user = user._id

	const createdBlog = await blog.save()

	user.blogs = user.blogs.concat(createdBlog._id)
	await user.save()

	response.status(201).json(createdBlog)
})

router.put('/:id', async (request, response) => {
	const { title, url, author, likes } = request.body

	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		{ title, url, author, likes },
		{ new: true }
	)

	response.json(updatedBlog)
})

router.delete('/:id', userExtractor, async (request, response) => {
	const blogId = request.params.id

	const blog = await Blog.findById(blogId)
	console.log(blog)
	const user = request.user

	if (!user || blog.user.toString() !== user.id.toString()) {
		return response.status(401).json({ error: 'operation not permitted' })
	}

	try {
		await Blog.deleteOne({ _id: blogId })
		user.blogs = user.blogs.filter((b) => b.toString() !== blogId)
		await user.save()

		response.status(204).end()
	} catch (error) {
		console.error('Blog delete error:', error)
		response.status(500).json({ error: 'Internal Server Error' })
	}
})

module.exports = router
