const mongoose = require('mongoose')
if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
const url = "mongodb+srv://nformentipedroia:BlogList@cluster0.aoqbluz.mongodb.net/BlogList?retryWrites=true&w=majority"
mongoose.set('strictQuery',false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog(
    {
      title: 'Article number One',
      author: 'Nicole Formenti',
      url: 'nick.com',
      likes: 3,
    }
    )

    Blog.find({}).then(result => {
        result.forEach(blog => {
          console.log(blog)
        })
        mongoose.connection.close()
      })
