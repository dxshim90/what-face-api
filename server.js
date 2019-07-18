const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@john.com",
      password: "123456",
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "Sally",
      email: "Sally@Sally.com",
      password: "123456",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("Success");
  } else {
    res.status(400).json("Error");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const newUser = {
    id: "131",
    name: req.body.name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  };
  database.users.push(newUser);
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("Not Found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("Not Found");
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
