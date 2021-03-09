const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach( async () => {
  await Blog.deleteMany({})
  const blogsObj = helper.initialBlogs.map(blog => new Blog(blog))
  const blogsPromise = blogsObj.map(blog => blog.save())
  await Promise.all(blogsPromise)
})

describe('api test', () => {
  test('correct amount of blog', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)  
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).toBe(undefined)
  })

  test('POST successfully create a new blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToPost = {    
      title: 'post blog entry',
      author: 'String',
      url: 'String',
      likes: 6
    }
    
    await api
      .post('/api/blogs')
      .send(blogToPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)
    
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(titles).toContain(blogToPost.title)

  })

  test('likes property default to 0', async () => {
    const noteWithOutLikes = {    
      title: 'post blog entry',
      author: 'String',
      url: 'String',
    }

    const postedBlog = await api 
      .post('/api/blogs')
      .send(noteWithOutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(postedBlog.body.likes).toBe(0)
    
  })
  
  test('title and url response status 400', async () => {
    const badPost = {
      likes: 8,
      author:'yo mismo'
    }
    await api
      .post('/api/blogs')
      .send(badPost)
      .expect(400)
  })
  
})

afterAll(() => mongoose.connection.close())