const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogsReturned = await Blog.find({})
  response.json(blogsReturned)
})
  
blogsRouter.post('/', async (request, response) => {
  if (request.body.title === undefined && request.body.url === undefined) {
    return response.status(400).end()
  }
  const blogToPost =  {    
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  }
  const blog = new Blog(blogToPost)
  
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const noteToUpdate = request.body
  const id = request.params.id
  const newBlog = {
    title: noteToUpdate.title,
    author: noteToUpdate.author,
    url: noteToUpdate.url,
    likes: noteToUpdate.likes || 0
  }

  const blogUpdated = await Blog.findByIdAndUpdate(id, newBlog, {new: true})
  response.json(blogUpdated)
})

module.exports = blogsRouter