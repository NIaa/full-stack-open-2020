import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


const App = (props) => {
  const len = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(len).fill(0))
  const [maxPoints, setMaxPoints] = useState(0)

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)

    if (copy[selected] >= points[maxPoints]) {
      setMaxPoints(selected)
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <br/>
      has {points[selected]} votes
      <br/>
      <Button handleClick = {vote}
        text="vote"/>
      <Button 
        handleClick={() => setSelected([getRandomInt(len)])} 
        text="next anecode"/>
      <h2>Anecdote with most votes</h2>
      {anecdotes[maxPoints]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
