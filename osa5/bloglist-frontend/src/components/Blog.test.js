import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only title, but no author, url or likes', () => {
  const blog = {
    title: 'Testi blogi',
    author: 'Testi Timppa',
    url: 'www.timppatestaa.fi',
    likes: 20,
    user: { name: 'Testi Tiina'}
  }

  
  render(
    <Blog blog={blog} setBlogs={() => {}} user={{ username: 'Testi Tiina' }} />)
  
  const titleElement = screen.getByText('Testi blogi')
  // queryByText for elements not to be found in render
  const authorElement = screen.queryByText('Testi Timppa')
  const urlElement = screen.queryByText('www.timppatestaa.fi')
  const likesElement = screen.queryByText('20')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeNull()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()

})