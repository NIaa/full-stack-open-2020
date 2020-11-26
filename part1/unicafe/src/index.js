import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistic = ({text, number}) => (
    <tr><td>{text}</td><td>{number}</td></tr>
)

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    if (all === 0) {
        return <p>No feedback given</p>
    } else {
        return <table><tbody>
            <Statistic text="good" number={good}/>
            <Statistic text="neutral" number={neutral}/>
            <Statistic text="bad" number={bad}/>
            <Statistic text="all" number={all}/>
            <Statistic text="average" number={(good-bad)/all}/>
            <Statistic text="positive" number={(good/all*100)+" %"}/>
            </tbody></table>
        }

}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header text="give feedback"/>
            <Button handleClick={() => setGood(good+1)} text="good"/>
            <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
            <Button handleClick={() => setBad(bad+1)} text="bad"/>
            <Header text="statistics"/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
