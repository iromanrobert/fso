import { useState } from "react";

import "./index.css";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const voteAnnecdote = () => {
    const currentAnecdote = selected;
    const copy = { ...votes };
    copy[currentAnecdote] += 1;
    setVotes(copy);
  };

  const setRandomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const maxVotes = Math.max(...Object.values(votes));
  const mostVotedIndex = Object.keys(votes).find(
    (key) => votes[key] === maxVotes,
  );

  return (
    <section className="container">
      <div className="anecdotes">
        <header className="ancdotes__header">Anecdotes of the day</header>
        <p className="anecdote__paragraph">{anecdotes[selected]}</p>
        <div className="anecdote-votes__container">
          <span className="divider"></span>
          <p className="anecdote-votes__count">{votes[selected]} votes</p>
          <span className="divider"></span>
        </div>
        <div className="button-container">
          <button onClick={setRandomAnecdote}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="6" fill="#202632" />
              <circle cx="8.56327" cy="8.56327" r="1.68436" fill="#EEEEEE" />
              <circle cx="8.56327" cy="15.2898" r="1.68436" fill="#EEEEEE" />
              <circle cx="15.2898" cy="8.56327" r="1.68436" fill="#EEEEEE" />
              <circle cx="15.2898" cy="15.2898" r="1.68436" fill="#EEEEEE" />
              <circle cx="11.9265" cy="11.9265" r="1.68436" fill="#EEEEEE" />
            </svg>
          </button>
          <button onClick={voteAnnecdote}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99997 20H17.1919C17.9865 20 18.7058 19.5296 19.0243 18.8016L21.8323 12.3833C21.9429 12.1305 22 11.8576 22 11.5816V11C22 9.89543 21.1045 9 20 9H13.5L14.7066 4.5757C14.8772 3.95023 14.5826 3.2913 14.0027 3.00136C13.4204 2.7102 12.7134 2.87256 12.3164 3.3886L8.41472 8.46082C8.14579 8.81044 7.99997 9.23915 7.99997 9.68024V20ZM7.99997 20H2V10H7.99997V20Z"
                stroke="#202632"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="anecdotes">
        <header className="ancdotes__header">Anecdote with most votes</header>
        <p className="anecdote__paragraph">{anecdotes[mostVotedIndex]}</p>
        <div className="anecdote-votes__container">
          <span className="divider"></span>
          <p className="anecdote-votes__count">{maxVotes} votes</p>
          <span className="divider"></span>
        </div>
      </div>
    </section>
  );
};

export default App;
