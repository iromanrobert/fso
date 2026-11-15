import { useParams } from "react-router-dom";
import { Paper, Typography, Stack, Button, Link } from "@mui/material";

const Blog = ({ blogs, user, handleLike, handleDelete }) => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) return null;

  const isLoggedIn = Boolean(user);
  const isCreator = isLoggedIn && blog.user?.username === user.username;

  return (
    <Paper className="blog-container" sx={{ p: 3, mt: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5" component="h2">
          {blog.title} by {blog.author}
        </Typography>

        <Link href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </Link>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography>
            <span className="likes-count">{blog.likes}</span> likes
          </Typography>
          {isLoggedIn && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleLike(blog)}
            >
              like
            </Button>
          )}
        </Stack>

        <Typography variant="body2" color="text.secondary">
          added by {blog.user?.username}
        </Typography>

        {isCreator && (
          <Button
            variant="contained"
            color="error"
            sx={{ alignSelf: "flex-start" }}
            onClick={() => handleDelete(blog.id)}
          >
            delete
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

export default Blog;
