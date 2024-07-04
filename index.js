require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Joi = require("joi");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

app.get("/api/users", (req, res) => {
  // This is a placeholder. In a real app, you'd fetch this from a database.
  const users = [
    { id: 1, username: "john_doe" },
    { id: 2, username: "jane_doe" },
  ];
  res.json(users);
});

app.post("/api/register", (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = req.body;
  // This is a placeholder. In a real app, you'd save this to a database.
  const newUser = { id: Date.now(), username };
  res.status(201).json(newUser);
});

app.post("/api/login", (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = req.body;
  // This is a placeholder. In a real app, you'd verify against a database.
  res.json({ message: `Welcome, ${username}!` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
