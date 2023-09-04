const dummy = () => {
    return 1
}
const totalLikes = (blogs) => {
    let sumOfLikes = 0
    blogs.forEach(blog => {
        sumOfLikes += blog['likes']
    })
    return sumOfLikes
}
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const result = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })

    const convertedResult = {
        title: result.title,
        author: result.author,
        likes: result.likes
    }

    return convertedResult
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }