# Fuel Expense Tracker





A web application to manage and track fuel expenses for multiple vehicles. Users can record fuel logs (vehicle, liters, price per liter, date), calculate mileage and total expenses, and view stats. Built with Vue 3 Composition API, Pinia for state management, and MongoDB for data storage.


## Configuration

- config.json
```
{
  "port": 3030,
  "host": "localhost",
  "username": "your-Mongo-Username",
  "userpassword": "your-Mongo-Password",
  "userstring": "your-mongo-cluster-string",
  "clustername": "your-clustername",
  "dbname": "your-database-name"
}
```

## API Reference

### Auth & User Management

| Method | Endpoint       | Description                  |
| ------ | -------------- | ---------------------------- |
| POST   | `/data`        | Register a new user          |
| POST   | `/login`       | Login user and start session |
| GET    | `/logout`      | Logout user                  |
| GET    | `/profile`     | Get current session user     |
| GET    | `/data`        | Get all users                |
| PUT    | `/edit/:uid`   | Get user data by ID          |
| PUT    | `/update/:uid` | Update user info             |
| DELETE | `/edit/:uid`   | Delete user by ID            |

### Vehicle Management

| Method | Endpoint            | Description                           |
| ------ | ------------------- | ------------------------------------- |
| POST   | `/vehicle-data`     | Add a new vehicle                     |
| GET    | `/vehicle-data`     | Get all vehicles                      |
| GET    | `/vehicle-data/:id` | Get a vehicle by ID                   |
| DELETE | `/vehicle-data/:id` | Delete a vehicle                      |


### Fuel Log Management

| Method | Endpoint                    | Description                      |
| ------ | --------------------------- | -------------------------------- |
| POST   | `/fuel-log`                 | Add a fuel log                   |
| GET    | `/fuel-log/:vehicleId`      | Get fuel logs for a vehicle      |
| GET    | `/vehicle/:vehicleId/stats` | Get fuel logs by vehicle Id|




## How to Run ? | Installation

1. Clone project into your computer 

2. After Follow this steps : 

- Backend

```bash
cd backend
npm i
node . or npx nodemon .
```

- Frontend
```bash
cd frontend
npm i
npm run dev
```
3. Go to http://localhost:5173 for Output.

##

For Login Page Credentials :  

**Email:** user@gmail.com

**Password:** 1234


## Tech Stack

**Client:** Vue, HTML, CSS, Bootstrap

**Server:** Node JS, Express JS, MongoDB + Mongoose

