const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


describe('blog-related tests:', () => {
    beforeEach(async () => {

        await Blog.deleteMany({})

        const blogObjects = helper.initialBlogs
            .map(blog => new Blog(blog))

        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('all blogs are returned, and they are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the unique identifier property of the blog posts is named "id"', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "This is a test",
            author: "Nicole Formenti-Pedroia",
            url: "nick.com",
            likes: 1
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const contents = blogsAtEnd.map(b => b.content)
        expect(contents).toContain(
          'This is a test'
        )
      })

      test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
    
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(
          helper.initialBlogs.length - 1
        )
    
        const contents = blogsAtEnd.map(r => r.content)
    
        expect(contents).not.toContain(blogToDelete.content)
      })

      test('updating an existing note works and likes number is updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newBlog = {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 15
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].likes).toBe(newBlog.likes)
    })

})

afterAll(() => {
    mongoose.connection.close()
})