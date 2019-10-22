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

  app.post('/login', ControllerCallbacks.verify);


}