import { useAnecdotesActions } from "../store";

const AnecdoteForm = () => {
  const { add } = useAnecdotesActions();

  const createAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdoteInput.value;
    await add(content);
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
