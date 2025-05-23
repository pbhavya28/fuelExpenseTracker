const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const errorHandler = require("./utils").errorHandler;
const config = require("./config.json");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const session = require("express-session");

app.use(
  session({
    secret: "your-session-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);

let url = `mongodb+srv://${config.username}:${config.userpassword}@${config.dbname}.${config.userstring}.mongodb.net/${config.dbname}?retryWrites=true&w=majority&appName=Valtech`;

mongoose
  .connect(url)
  .then(() => console.log("DB Connected!!"))
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

const Vehicle = mongoose.model(
  "Vehicle",
  new Schema({
    id: ObjectId,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    vehicleName: String,
    vehicleNumber: { type: String, unique: true },
    vehicleImage: String,
    fuelType: { type: String, enum: ["petrol", "diesel"] },
  })
);
 
const FuelLog = mongoose.model(
  "FuelLog",
  new Schema({
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    liters: { type: Number, required: true },
    pricePerLiter: { type: Number, required: true },
    distance: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: false },
    date: { type: Date, required: true },
  })
);
 
// add Fuel log 
app.post("/fuel-log", async (req, res) => {
  try {
    const { vehicleId, liters, pricePerLiter, distance, date } = req.body;
 
    const price = liters * pricePerLiter;
    const mileage = distance / liters;
 
    const fuelLog = new FuelLog({
      vehicleId,
      liters,
      pricePerLiter,
      distance,
      price,
      mileage,
      date,
    });
 
    const dbRes = await fuelLog.save();
    res.send({ message: "Fuel log added", fuelLog: dbRes });
  } catch (error) {
    console.error("Error adding fuel log:", error);
    res.status(500).json({ message: "Error adding fuel log", error });
  }
});
 
// get fuel log
app.get("/fuel-log/:vehicleId", async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const fuelLogs = await FuelLog.find({ vehicleId }).sort({ date: -1 });
    res.json(fuelLogs);
  } catch (error) {
    console.error("Error fetching fuel logs:", error);
    res.status(500).json({ message: "Error fetching fuel logs", error });
  }
});



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

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    req.session.user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    res.status(200).json({
      message: "Login successful",
      user: req.session.user,
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



app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ error: "User not logged in" });
  }

  res.send({ userinfo: req.session.user });
});



app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send({ error: "Could not log out" });
    res.send({ message: "Logout successful" });
  });
});

app.post("/vehicle-data", async (req, res) => {
  try {
    const vehicle = new Vehicle({
      userId: req.body.userId,
      vehicleName: req.body.vehicleName,
      vehicleNumber: req.body.vehicleNumber,
      vehicleImage: req.body.vehicleImage,
      fuelType: req.body.fuelType,
    });

    const dbres = await vehicle.save();
    res.send({ message: "Vehicle added", vehicle: dbres });
  } catch (error) {
    console.error("Error saving vehicle:", error);
    res.status(500).json({ message: "Error saving vehicle", error });
  }
});

app.get("/vehicle-data", async (req, res) => {
  try {
    const filter = {};
    if (req.query.userId) {
      filter.userId = req.query.userId;
    }

    const vehicles = await Vehicle.find(filter);
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    res.status(500).json({ message: "Error fetching vehicles", error });
  }
});

app.get("/vehicle-data/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);  // Send back the vehicle data
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    res.status(500).json({ message: "Error fetching vehicle data", error });
  }
});

app.delete("/vehicle-data/:id", async (req, res) => {
  try {
    const result = await Vehicle.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete vehicle" });
  }
});

// Getting all logs 

app.get("/vehicle/:vehicleId/stats", (req, res) => {
  Vehicle.findById(req.params.vehicleId)
    .then((vehicle) => {
      if (!vehicle) {
        return console.log("Vehicle Not Found!!");
      }
      FuelLog.find({ vehicleId: req.params.vehicleId })
      .then((logs) => {
        res.json({ vehicleNumber: vehicle.vehicleNumber, logs });
      });
    })
    .catch((error) => {
      console.log("Error fetching vehicle logs:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.listen(config.port, config.host, () => {
  console.log(`Server running on ${config.host}:${config.port}`);
});
