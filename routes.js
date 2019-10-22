module.exports = (app, allModels) => {

  /*
   *  =========================================
   *  =========================================÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR TWEEDR CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const ControllerCallbacks = require('./controllers/lawyers')(allModels);

  app.get('/login', ControllerCallbacks.login);

  app.post('/partner', ControllerCallbacks.verify);

  app.post('/projects', ControllerCallbacks.newProject);

  app.get('/projects/:id', ControllerCallbacks.project);
}