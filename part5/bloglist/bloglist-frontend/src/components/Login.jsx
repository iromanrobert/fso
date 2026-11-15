import { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";

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
      <Stack spacing={2} sx={{ maxWidth: "360px" }}>
        <Typography variant="h5" component="h2">
          Log in
        </Typography>

        <TextField
          label="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />

        <TextField
          label="password"
          type="password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          id="password"
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
