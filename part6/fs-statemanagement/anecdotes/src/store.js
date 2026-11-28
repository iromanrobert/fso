import { create } from "zustand";

import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    add: async (content) => {
      const anecdote = await anecdoteService.create(content);
      set((state) => ({ anecdotes: [...state.anecdotes, anecdote] }));
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find((anecdote) => anecdote.id === id);
      const update = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? update : anecdote,
        ),
      }));
    },
    setFilter: (filter) => set({ filter }),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
  },
}));

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes);
export const useFilter = () => useAnecdoteStore((state) => state.filter);
export const useAnecdotesActions = () =>
  useAnecdoteStore((state) => state.actions);
