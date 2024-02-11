import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const createBlog = jest.fn()

	render(<BlogForm createBlog={createBlog} />)

	const titleInput = screen.getByPlaceholderText('Enter title')
	const authorInput = screen.getByPlaceholderText('Enter author')
	const urlInput = screen.getByPlaceholderText('Enter URL')
	const saveButton = screen.getByRole('button', { name: 'save' })

	await userEvent.type(titleInput, 'Timppa testaa taas!')
	await userEvent.type(authorInput, 'Testi Timppa')
	await userEvent.type(urlInput, 'www.timppatestaa.fi')
	await userEvent.click(saveButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('Timppa testaa taas!')
	expect(createBlog.mock.calls[0][0].author).toBe('Testi Timppa')
	expect(createBlog.mock.calls[0][0].url).toBe('www.timppatestaa.fi')
})
