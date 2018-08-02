// appointments.route.js

const express = require('../../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/express'),
  appointmentRoutes = express.Router(),
  app = express(),
  Appointment = require('../models/appointment');
// Defined store route
appointmentRoutes.route('/set')
  .post(function (req, res) {
    let appointments =  new Appointment(req.body);
    appointments.save(function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  });

// Defined get data(index or xlisting) route
appointmentRoutes.route('/').get(function (req, res) {
  Appointment.find(function (err, appointments) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(appointments);
    }
  });
});

function makeArray(value) {
  return j.map(function(a) {
    return {[value]: a[value]};
  });
}
// Defined edit route
appointmentRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Appointment.findById(id, function (err, appointments) {
    res.json(appointments);
  });
});

//  Defined update route
appointmentRoutes.route('/update/:id').post(function (req, res) {
  Appointment.findById(req.params.id, function (err, appointments) {
    if (!appointments)
      return next(new Error('Could not load Document'));
    else {
      appointments.name = req.body.name;
      appointments.price = req.body.price;

      appointments.save().then(appointments => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
appointmentRoutes.route('/delete/:id').get(function (req, res) {
  Appointment.findByIdAndRemove({ _id: req.params.id }, function (err, appointments) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});
// Defined delete | remove | destroy route
appointmentRoutes.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});


module.exports = appointmentRoutes;