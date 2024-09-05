// Import packages
const express = require("express");
const bodyParser = require('body-parser');
const home = require("./routes/home");
const cors = require('cors');

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/home", home);

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: '*',
  }),
);

const users = [
    { username: 'user1', password: 'password1', role: 'admin' },
    { username: 'user2', password: 'password2', role: 'user' },
    { username: 'user3', password: 'password3', role: 'moderator' },
  ];


app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    const user = users.find((u) => u.username === username && u.password === password);
  
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });


// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
