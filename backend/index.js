const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const errorHandler = require("./utils").errorHandler;
const config = require("./config.json");

const app = express();


app.use(express.json());


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));



const session = require('express-session');

app.use(session({
  secret: 'your-session-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 
  }
}));


const url = 'mongodb+srv://admin:admin@valtech.ar5i3kk.mongodb.net/?retryWrites=true&w=majority&appName=Valtech';

mongoose
  .connect(url)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log("Error", error));

// Schema & Model
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = mongoose.model(
  "User",
  new Schema({
    id: ObjectId,
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
  })
);


app.post("/data", async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    const dbres = await user.save();
    res.send({ message: "User registered", user: dbres });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      errorHandler(error, req, res);
    }
  }
});


app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }


    req.session.user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };

    res.status(200).json({
      message: "Login successful",
      user: req.session.user
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});



app.get("/data", (req, res) => {
  User.find()
    .then((dbRes) => res.json(dbRes))
    .catch((error) => errorHandler(error, req, res));
});

app.put("/edit/:uid", (req, res) => {
  User.findById({ _id: req.params["uid"] })
    .then((dbRes) => res.send(dbRes))
    .catch((error) => errorHandler(error, req, res));
});


app.put("/update/:uid", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params["uid"] },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    }
  )
    .then((dbRes) =>
      res.send({ message: "User info updated", name: dbRes.firstName })
    )
    .catch((error) => errorHandler(error, req, res));
});


app.delete("/edit/:uid", (req, res) => {
  User.findByIdAndDelete({ _id: req.params["uid"] })
    .then((dbres) =>
      res.send({ message: "User deleted", name: dbres.firstName })
    )
    .catch((error) => errorHandler(error, req, res));
});


// app.get('/test-insert', async (req, res) => {
//   try {
//     const hashedPassword = bcrypt.hashSync("bhavya123", 10);
//     const user = new User({
//       firstName: "Bhavya",
//       lastName: "Patel",
//       email: "testuser@example.com",
//       password: hashedPassword
//     });
//     const savedUser = await user.save();
//     res.send({ message: "Test user inserted", user: savedUser });
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

app.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ error: 'User not logged in' });
  }

  res.send({ userinfo: req.session.user });
});
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send({ error: 'Could not log out' });
    res.send({ message: 'Logout successful' });
  });
});


app.listen(config.port, config.host, () => {
  console.log(`Server running on ${config.host}:${config.port}`);
});
