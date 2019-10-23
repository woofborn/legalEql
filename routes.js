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
  const loginCallbacks = require('./controllers/login')(allModels)
  const ControllerCallbacks = require('./controllers/lawyers')(allModels);


  app.get('/login', loginCallbacks.login);

  app.post('/login', loginCallbacks.verify);

  app.get('/projects', ControllerCallbacks.partnerPage);

  app.get('/associates/:projectname', ControllerCallbacks.associates);

  app.post('/projects', ControllerCallbacks.newProject);

  app.get('/projects/:name', ControllerCallbacks.project);

  app.post('/projects/:name/newmember', ControllerCallbacks.addTeam)
}