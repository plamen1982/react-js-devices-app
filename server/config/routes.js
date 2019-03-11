const authRoutes = require('../routes/auth');
const deviceRoutes = require('../routes/device');
const statsRoutes = require('../routes/stats');
const barrowsRoutes = require('../routes/borrow');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/device', deviceRoutes);
  app.use('/stats', statsRoutes);
  app.use('/borrow', barrowsRoutes);
}
