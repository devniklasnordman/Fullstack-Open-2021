const totalLikes = (blogs) => {
  return blogs.length === 0
  ? 0 
  : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null
    }  

    return blogs.reduce((acc, cur) => {
      return cur.likes > acc.likes ? cur : acc
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}