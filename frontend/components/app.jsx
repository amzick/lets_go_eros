import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

//components
import SplashContainer from '../components/splash/splash_container';
import LoginFormContainer from '../components/session_form/login_form_container';
import SignupFormContainer from '../components/session_form/signup_form_container';

const App = () => {
  return (
    <Switch>
      <AuthRoute exact path="/" component={SplashContainer} />
      <AuthRoute exact path='/login' component={LoginFormContainer} />
      <AuthRoute exact path='/onboarding' component={SignupFormContainer} />
    </Switch>
  );
};

export default App;