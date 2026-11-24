import { useAnecdotesActions } from "../store";

const AnecdoteForm = () => {
  const { add } = useAnecdotesActions();
  const generateId = () => Number((Math.random() * 1000000).toFixed(0));

  const createAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdoteInput.value;
    add({ id: generateId(), content, votes: 0 });
    e.target.reset();
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdoteInput" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
