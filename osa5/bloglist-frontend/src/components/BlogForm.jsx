import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    createBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
    
  }

  return (
        <div>
        <form onSubmit={addBlog}>
          title:
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          author:
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
          url:
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          <button type="submit">save</button>
        </form>  
        </div>
  )
}

export default BlogForm