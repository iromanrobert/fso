import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };
  const handleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={handleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={handleVisibility}>cancel</button>
      </div>
    </>
  );
};

export default Togglable;
