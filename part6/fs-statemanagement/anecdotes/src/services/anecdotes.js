const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to get anecdotes");
  }

  return await response.json();
};

const create = async (content) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: content, votes: 0 }),
  });

  if (!response.ok) {
    throw new Error("Failed to add new annecdote");
  }

  return response.json();
};

const update = async (id, anecdote) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  });

  if (!response.ok) {
    throw new Error("Failed to update annecdote");
  }

  return response.json();
};

export default { getAll, create, update };
