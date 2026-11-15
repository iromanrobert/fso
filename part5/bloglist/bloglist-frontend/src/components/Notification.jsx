import { Alert } from "@mui/material";

const Notification = ({ message, type = "info" }) => {
  if (!message) {
    return null;
  }

  return (
    <Alert severity={type} sx={{ my: 2 }}>
      {message}
    </Alert>
  );
};

export default Notification;
