import { useFeedbackActions } from "../store";

const Buttons = () => {
  const { rateGood, rateNeutral, rateBad } = useFeedbackActions();
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={rateGood}>good</button>
      <button onClick={rateNeutral}>neutral</button>
      <button onClick={rateBad}>bad</button>
    </div>
  );
};

export default Buttons;
