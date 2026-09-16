import { useState } from 'react'

import './App.css'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const handleGoodFeedback = () => {
    setGood(good + 1)
  }
  
  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }

  return (
    <section>
      <header>Feedback Request</header>
      <div>
        <Button onClick={handleGoodFeedback} text="Good 😊" />
        <Button onClick={handleNeutralFeedback} text="Neutral 😐" />
        <Button onClick={handleBadFeedback} text="Bad 🙁" />
      </div>
      <div>
        <p>Statistics go here</p>
        <ul>
          <li>good: {good}</li>
          <li>neutral: {neutral}</li>
          <li>bad: {bad}</li>
        </ul>
      </div>
    </section>
  )
}

export default App
