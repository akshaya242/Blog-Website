import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Art of Mindful Living",
    content:
      "In today's fast-paced world, mindfulness has emerged as a powerful tool for enhancing well-being and reducing stress. Rooted in ancient contemplative practices, mindfulness invites us to cultivate present-moment awareness and non-judgmental acceptance of our thoughts and emotions. By training our minds to focus on the present, we can break free from the grip of anxiety about the future or rumination over the past, fostering compassion and empathy towards ourselves and others, nurturing more fulfilling relationships and a greater sense of interconnectedness.",
    author: "Liam Johnson",
    date: "2023-08-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Navigating Remote Work Challenges",
    content:
      "With the proliferation of remote work, individuals and organizations alike are navigating a new set of challenges and opportunities. From maintaining work-life balance to fostering team collaboration across time zones, remote work requires adaptability and effective communication strategies. While it offers flexibility and autonomy, remote work also demands discipline and boundary-setting to mitigate distractions and ensure productivity. By embracing technology and cultivating a supportive virtual culture, remote teams can overcome obstacles and thrive in the ever-evolving landscape of remote work.",
    author: "Adam Lee",
    date: " 2023-09-25T10:00:00Z",
  },
  {
    id: 3,
    title: "The Rise of Sustainable Fashion",
    content:
      "In recent years, sustainable fashion has gained momentum as consumers increasingly prioritize ethical and eco-friendly practices. From organic fabrics to fair labor practices, sustainable brands are reshaping the fashion industry's landscape, challenging conventional notions of consumption and production. By embracing sustainability, fashion companies not only reduce their environmental footprint but also foster transparency and accountability throughout the supply chain, inspiring a shift towards more conscious consumption habits and a greener future for the industry.",
    author: "Maya Singh",
    date: "2023-09-10T10:00:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
