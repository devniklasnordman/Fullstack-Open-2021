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

test('renders all blog details after button click', async () => {
  const blog = {
    title: 'Testi blogi',
    author: 'Testi Timppa',
    url: 'www.timppatestaa.fi',
    likes: 20,
    user: { name: 'Testi Tiina'}
  }

  render(
    <Blog blog={blog} setBlogs={() => {}} user={{ username: 'Testi Tiina' }} />)
  
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const urlElement = screen.getByText('www.timppatestaa.fi')
  const likesElement = screen.getByText('likes 20')
  const userElement = screen.getByText('added by Testi Tiina')

  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
  expect(userElement).toBeDefined()
})

test('clicking like button twice will trigger event handler twice', async () => {
  const blog = {
    title: 'Testi blogi',
    author: 'Testi Timppa',
    url: 'www.timppatestaa.fi',
    likes: 20,
    user: { name: 'Testi Tiina'},
    // valid id from database
    id: '656db8090a1db7941a379e0d'
  }

  const mockHandler = jest.fn()

  render(
    <Blog
      blog={blog}
      setBlogs={mockHandler}
      user={{ username: 'Testi Tiina' }}
    />,
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  console.log(mockHandler.mock.calls)
  // wait for the async operation to complete
  await new Promise((resolve) => setTimeout(resolve, 1000))

  expect(mockHandler.mock.calls).toHaveLength(2)

})