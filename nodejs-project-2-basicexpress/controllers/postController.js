let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
  { id: 4, title: "Post Four" },
  { id: 5, title: "Post Five" },
];

// @desc    Get All Posts
// @route   GET /api/posts
export const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

// @desc    Get Single Posts
// @route   GET /api/posts
export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
};

// @desc    Create new Post
// @route   POST /api/posts
export const createPost = (req, res, next) => {
  console.log(req.body);
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };
  if (!newPost.title) {
    const error = new Error("Please include a title");
    error.status = 400;
    return next(error);

    // return res.status(400).json({ msg: "Please include a title" });
  }
  posts.push(newPost);
  res.status(201).json(posts);
};

// @desc    Update new Post
// @route   UPDATE /api/posts
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((i) => i.id === id);
  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);

    // return res
    //   .status(404)
    //   .json({ msg: `A post with the id of ${id} was not found` });
  }
  post.title = req.body.title;
  res.status(200).json(posts);
};

// @desc    Delete new Post
// @route   DELETE /api/posts
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((i) => i.id === id);
  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);

    // return res
    //   .status(404)
    //   .json({ msg: `A post with the id of ${id} was not found` });
  }
  posts = posts.filter((i) => i.id !== id);
  res.status(200).json(posts);
};
