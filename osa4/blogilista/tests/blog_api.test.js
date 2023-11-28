const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const Blog = require('../models/blog')
const helper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are four blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(4)
})

test('_id transformed into id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    expect(blog.id).toBeDefined
  });
})

test('a valid blog can be added ', async () => {
  const users = await api.get('/api/users')
  const userId = users.body[1].id
  console.log(userId)

  const newBlog = {
    title: 'Test blog title',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    userId: userId,  
  };

  try {
    const response = await api
  .post('/api/blogs')
  .send(newBlog)

  console.log('Response status code:', response.status)

  expect(response.status).toBe(201)
  expect(response.header['content-type']).toMatch(/application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Test blog title')

    const addedBlogId = response.body.id

    expect(response.body.user).toBeDefined()
    expect(response.body.user.username).toBeDefined()
    expect(response.body.user.name).toBeDefined()
  } catch (error) {
    console.error('Test Error:', error)
    if (error.response && error.response.body) {
      console.error('Response:', error.response)
    }

    throw error; // This ensures that the test fails if there's an error
  }
});



test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  console.log('Blog to delete', blogToDelete.id)
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'niknor',
      name: 'Niklas Nordman',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})