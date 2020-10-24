const path = require("path");

module.exports = (app) => {
  // home route
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+ '/../public/index.html'));
  });
  // stats dashboard
  app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname+ '/../public/stats.html'));
  });
  // new exercise page
  app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname+ '/../public/exercise.html'));
  });

};
