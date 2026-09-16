import { useState } from "react";

import "./App.css";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticItem = ({ statisticLabel, statisticValue }) => {
  return (
    <tr>
      <td>{statisticLabel}</td>
      <td>{statisticValue}</td>
    </tr>
  );
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
    <table>
      <tbody>
        <StatisticItem statisticLabel="Good" statisticValue={good} />
        <StatisticItem statisticLabel="Neutral" statisticValue={neutral} />
        <StatisticItem statisticLabel="Bad" statisticValue={bad} />
        <StatisticItem statisticLabel="Total" statisticValue={total} />
        <StatisticItem statisticLabel="Average" statisticValue={averageScore} />
        <StatisticItem
          statisticLabel="Percentage"
          statisticValue={`${percentage} %`}
        />
      </tbody>
    </table>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

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
    <section className="feedback">
      <header className="feedback__header">Feedback Request</header>
      <div className="button-list">
        <Button onClick={handleGoodFeedback} text="Good 😊" />
        <Button onClick={handleNeutralFeedback} text="Neutral 😐" />
        <Button onClick={handleBadFeedback} text="Bad 🙁" />
      </div>
      <div className="feedback-statistic">
        <p>Statistics</p>
        {total === 0 ? (
          <p>No feedback given</p>
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            percentage={percentage}
            averageScore={averageScore / total}
          />
        )}
      </div>
    </section>
  );
}

export default App;
