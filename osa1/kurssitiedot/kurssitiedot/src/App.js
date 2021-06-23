import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  }

  
  
  const ex1 = course.parts[0].exercises
  const ex2 = course.parts[1].exercises
  const ex3 = course.parts[2].exercises

  const allEx = ex1 + ex2 + ex3

  
  
  const Header = (props) =>{ 
    return (
      <div>
      <h1>
        {props.course}
      </h1>
      </div>
    )
  }
  const Content = (props) => {
    return (
      <div>
        <Part parts={props.parts[0]} />
        <Part parts={props.parts[1]} />
        <Part parts={props.parts[2]} />
      </div>
    )
    
  }

  const Total = (props) => {
    return (
    <div>
      {props.text} {allEx}
    </div>
    )
  } 
  
  const Part = (props) => {
    console.log(props)
    return (
      <div>
      {props.parts.name} {props.parts.exercises}
      </div> 
    )
  }
  

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total text="Number of exercises" parts={course.parts} />
    </div>
  )
}

export default App