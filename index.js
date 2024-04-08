//create cars api using express
const express = require('express');
const app = express();
const path = require('path');
// const cors = require('cors');

app.use(express.json());
// app.use(cors());
const cars = require('./cars.json');

//get all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

//

//get car by id
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);
    res.json(car);
});

//update car
app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    cars[index] = updatedCar;
    res.json(updatedCar);
});

//delete car
app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    cars.splice(index, 1);
    res.json({ message: `Car with id ${id} deleted` });
});

//add car
app.post('/cars', (req, res) => {
    console.log(req);
    const newCar = req.body;
    console.log(newCar);
    cars.push(newCar);
    res.json(newCar);
});

app.use(express.static(path.resolve(__dirname, './'), { maxAge : '1y', etag: false}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
  });

  //

//start app at localhost:3001
app.listen(process.env.PORT || 3001, () => {
    console.log('Server started at http://localhost:3001');
});