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
      <label htmlFor="username">username</label>
      <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        id="username"
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        value={password}
        onChange={({ target }) => {
          setPassword(target.value);
        }}
        id="password"
      />
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
