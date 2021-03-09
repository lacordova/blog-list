const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'this is the first entry of the blogs page',
    author: 'lucas cordova',
    url: 'http://somerandomurl.com/superapi/bestresult',
    likes: 10
  },
  {
    title: 'i wish have better english for code better',
    author: 'same one',
    url: 'http://besturl.com',
    likes:5
  }
]

const blogsInDb = async () => {
  const response = await Blog.find({})
  return response.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}