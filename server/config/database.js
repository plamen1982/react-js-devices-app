const mongoose = require('mongoose');
const User = require('../models/User');

//TO DO check if this global promise is still nedded
mongoose.Promise = global.Promise;

module.exports = (settings) => {
  mongoose.connect(settings.db);
  let db = mongoose.connection;

  db.once('open', err => {
    if (err) {
      throw err;
    }
    console.log('MongoDB ready!');
    User.seedAdminUser();
  })
  db.on('error', err => console.log(`Database error: ${err}`));
}
