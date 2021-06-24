import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <table>
    <tbody>
      <tr>
        <td width="55px">{props.text}</td><td>{props.value}</td>
      </tr>
    </tbody>
  </table>
)

const Statistics = (props) => {
 
  if (props.all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return (
    <div>
    <h1>statistics</h1>
    <StatisticLine text="good" value ={props.good} />
    <StatisticLine text="neutral" value ={props.neutral} />
    <StatisticLine text="bad" value ={props.bad} />
    <StatisticLine text="all" value ={props.all} />
    <StatisticLine text="average" value ={props.average} />
    <StatisticLine text="positive" value ={props.positive} />
    </div>
  )
  
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [averageSum, setAverageSum] = useState(0)
  const [positive, setPositive] = useState(0)

  const setToGood = (newValue) => {
    setGood(newValue)
    setToAll(all + 1)
    setAverageSum(averageSum + 1)
    setToAverage((averageSum + 1)/ (all + 1))
    setToPositive(newValue/(all + 1))
  }

  const setToNeutral = (newValue) => {
    setNeutral(newValue)
    setToAll(all + 1)
    setToAverage(averageSum/(all + 1))
    setToPositive(good/(all + 1))
  }

  const setToBad = (newValue) => {
    setBad(newValue)
    setToAll(all + 1)
    setAverageSum(averageSum - 1)
    setToAverage((averageSum - 1)/(all + 1))
    setToPositive(good/(all + 1))
  }

  const setToAll = (newValue) => {
    setAll(newValue)
  }

  const setToAverage = (newValue) => {
    setAverage(newValue)
  }

  const setToPositive = (newValue) => {
    setPositive(newValue)
  }



  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good"/>
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setToBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
      
    </div>
  )
}

export default App