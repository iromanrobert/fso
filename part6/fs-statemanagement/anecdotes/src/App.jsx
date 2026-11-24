import { useAnecdotes, useAnecdotesActions } from "./store";

const App = () => {
  const anecdotes = useAnecdotes();

  const { vote, add } = useAnecdotesActions();
  const generateId = () => Number(Math.random() * 10000).toFixed(0);

  const createAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdoteInput.value;
    add({ id: generateId(), content, votes: 0 });
    e.target.reset();
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdoteInput" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
