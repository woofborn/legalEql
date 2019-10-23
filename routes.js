module.exports = (app, allModels) => {

  /*
   *  =========================================
   *  =========================================÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const ControllerCallbacks = require('./controllers/lawyers')(allModels);

  app.get('/login', ControllerCallbacks.login);

  app.post('/partner', ControllerCallbacks.verify);

  app.get('/associates/:projectname', ControllerCallbacks.associates);

  app.post('/projects', ControllerCallbacks.newProject);

  app.get('/projects/:name', ControllerCallbacks.project);

  app.post('/projects/:name', ControllerCallbacks.addTeam)
}