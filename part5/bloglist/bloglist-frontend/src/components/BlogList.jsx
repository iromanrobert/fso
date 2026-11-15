import { Link } from "react-router-dom";
import {
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const BlogList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <>
      <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
        blogs
      </Typography>

      <Paper sx={{ mt: 2 }}>
        <List disablePadding>
          {sortedBlogs.map((blog) => (
            <ListItemButton
              key={blog.id}
              component={Link}
              to={`/blogs/${blog.id}`}
              divider
            >
              <ListItemText primary={`${blog.title} by ${blog.author}`} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default BlogList;
