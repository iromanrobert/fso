import { create } from "zustand";

const initialState = {
  good: 0,
  neutral: 0,
  bad: 0,
};
const useFeedbackStore = create((set) => ({
  ...initialState,

  actions: {
    rateGood: () =>
      set((state) => ({
        good: state.good + 1,
      })),
    rateNeutral: () =>
      set((state) => ({
        neutral: state.neutral + 1,
      })),
    rateBad: () =>
      set((state) => ({
        bad: state.bad + 1,
      })),
  },
}));

export const useFeedbackActions = () =>
  useFeedbackStore((state) => state.actions);

export const useFeedbackStats = () => {
  const good = useFeedbackStore((state) => state.good);
  const neutral = useFeedbackStore((state) => state.neutral);
  const bad = useFeedbackStore((state) => state.bad);

  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;
  const positivePercentage = total ? (good / total) * 100 : 0;

  return {
    good,
    neutral,
    bad,
    total,
    average: total ? average.toFixed(2) : 0,
    positivePercentage: total ? positivePercentage.toFixed() : 0,
  };
};
