// appointments.route.js
const express = require('express'),
  appointmentRoutes = express.Router(),
  app = express(),
  Appointment = require('../models/appointment');
// Defined store route
appointmentRoutes.route('/set')
  .post(function (req, res) {
    let appointments =  new Appointment(req.body);
    var service = { name: req.body.name, description: 'wash',time:'11:00',price:'90' }; 
    
    appointments.package.ServiceMenu.push(service)
     
    appointments.save(function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
      console.log(req.body)
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
      appointments.firstName = req.body.firstName;
      appointments.lastName = req.body.lastName;
      appointments.phone = req.body.phone;
      appointments.email = req.body.email;
      appointments.date = req.body.date;
      appointments.time = req.body.time;
     
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