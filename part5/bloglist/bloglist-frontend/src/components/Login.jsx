import { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <label htmlFor="">uername</label>
      <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <label htmlFor="">password</label>
      <input
        type="password"
        value={password}
        onChange={({ target }) => {
          setPassword(target.value);
        }}
      />
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
