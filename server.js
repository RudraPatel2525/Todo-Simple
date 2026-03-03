const path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
// Serve static files (CSS/JS) from /public
app.use(express.static("public"));

// Pages (each page = a route)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/todo.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "todo.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// app.post("/app", (req, res) => {
//   console.log("LOGIN ATTEMPT:", req.body);
//   res.send("Received: " + JSON.stringify(req.body));
// });

app.post("/app", (req, res) => {
  const { username, password } = req.body;

  fs.readFile(path.join(__dirname, "users.json"), "utf8", (err, text) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Server error reading users.json");
    }

    let users;
    try {
      users = JSON.parse(text);
    } catch (e) {
      return res.status(500).send("users.json is not valid JSON");
    }

    const match = users.find(u => u.username === username && u.password === password);

    if (match) {
      // Login success: send them to our app
      return res.redirect("/todo.html");
    } else {
      // Login failed: send back to login
      return res.redirect("/");
    }
  });
});