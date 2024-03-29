import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams,
  useNavigate
} from 'react-router-dom'
import { useField } from './hooks'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/createnew">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
  )
}

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    display: notification ? 'block' : 'none'
  }

  return (
    <div style={style}>
      a new anecdote {notification.content} created
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
       {anecdotes.map(anecdote => 
       <li key={anecdote.id}>
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
       </li> 
        )}
    </ul>
  </div>
)

const SingleAnecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))
  return (
  <div>
    <h3>{anecdote.content}</h3>
    <div>has {anecdote.votes} votes</div>
    <div>more info see {anecdote.info}</div>
  </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const { value: contentValue, onChange: contentOnChange, reset: contentReset } = useField('')
  const { value: authorValue, onChange: authorOnChange, reset: authorReset } = useField('')
  const { value: infoValue, onChange: infoOnChange, reset: infoReset } = useField('')

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentValue,
      author: authorValue,
      info: infoValue,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = () => {
    contentReset();
    authorReset();
    infoReset();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={contentValue} onChange={contentOnChange} />
        </div>
        <div>
          author
          <input name='author' value={authorValue} onChange={authorOnChange} />
        </div>
        <div>
          url for more info
          <input name='info' value={infoValue} onChange={infoOnChange} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(anecdote)
    setTimeout(() => {
      setNotification('')
    }, 5000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification}/>
      <Routes>
        <Route path="/createnew" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<SingleAnecdote anecdotes={anecdotes}/>} />
      </Routes>
      <Footer />
    </div>
    </Router>
  )
}

export default App
