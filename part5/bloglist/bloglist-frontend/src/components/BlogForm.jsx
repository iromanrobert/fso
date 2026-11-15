import { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
  };

  return (
    <form onSubmit={addBlog}>
      <Stack spacing={2} sx={{ maxWidth: "360px" }}>
        <Typography variant="h5" component="h2">
          Create new blog post
        </Typography>

        <TextField
          label="Title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          id="title"
        />

        <TextField
          label="Author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          id="author"
        />

        <TextField
          label="Link"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          id="url"
        />

        <Button variant="contained" type="submit">
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default BlogForm;
