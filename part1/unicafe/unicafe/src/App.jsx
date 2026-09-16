import { useState } from "react";

import "./App.css";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({
  good,
  neutral,
  bad,
  total,
  percentage,
  averageScore,
}) => {
  return (
    <ul>
      <li>good: {good}</li>
      <li>neutral: {neutral}</li>
      <li>bad: {bad}</li>
      <li>all: {total}</li>
      <li>percentage: {percentage}%</li>
      <li>average: {total === 0 ? 0 : averageScore / total}</li>
    </ul>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  console.log(averageScore);

  const calculatePercentage = () => {
    let percentage;
    if (total === 0) {
      return 0;
    }
    percentage = (good / total) * 100;

    return percentage.toFixed(1);
  };

  const handleGoodFeedback = () => {
    const updateGood = good + 1;
    setGood(updateGood);
    setTotal(updateGood + bad + neutral);
    setPercentage(calculatePercentage());
    setAverageScore(averageScore + 1);
  };

  const handleNeutralFeedback = () => {
    const updateNeutral = neutral + 1;
    setNeutral(updateNeutral);
    setTotal(updateNeutral + bad + good);
    setPercentage(calculatePercentage());
    setAverageScore(averageScore);
  };

  const handleBadFeedback = () => {
    const updateBad = bad + 1;
    setBad(updateBad);
    setTotal(updateBad + neutral + good);
    setPercentage(calculatePercentage());
    setAverageScore(averageScore - 1);
  };

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
        {total === 0 ? (
          <p>No feedback given</p>
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            percentage={percentage}
            averageScore={averageScore}
          />
        )}
      </div>
    </section>
  );
}

export default App;
