const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) =>
  blogList.reduce((sum, blog) => sum + blog.likes, 0);

const favouriteBlog = (blogList) => {
  return blogList.reduce((best, blog) =>
    blog.likes > best.likes ? blog : best,
  );
};

module.exports = { dummy, totalLikes, favouriteBlog };
