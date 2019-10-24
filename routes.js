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

  const associateCallbacks = require('./controllers/associates')(allModels);

  app.get('/', loginCallbacks.landing);

  app.get('/login/associates', associateCallbacks.login);

  app.post('/login/associates', associateCallbacks.verify);

  app.get('/login', loginCallbacks.login);

  app.post('/login', loginCallbacks.verify);


  app.get('/logout', loginCallbacks.logout);

  app.get('/projects', ControllerCallbacks.partnerPage);

  app.get('/associates/:projectname', ControllerCallbacks.associates);

  app.post('/associates/:projectname',ControllerCallbacks.remove);

  app.post('/projects', ControllerCallbacks.newProject);

  app.get('/projects/:name', ControllerCallbacks.project);

  app.get('/projects/:name/complete', ControllerCallbacks.complete);

  app.post('/projects/:name/newmember', ControllerCallbacks.addTeam)
}