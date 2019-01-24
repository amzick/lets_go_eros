import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

//components
import SplashContainer from '../components/splash/splash_container';
import LoginFormContainer from '../components/session_form/login_form_container';
import SignupFormContainer from '../components/session_form/signup_form_container';
import ProfileContainer from '../components/profile/profile_container';
import Logout from '../components/logout/logout';



// todo: change users route to profiles , add components, etc
const App = () => {
  return (
    <Switch>
      <ProtectedRoute exact path='/logout' component={Logout} />
      <AuthRoute exact path="/" component={SplashContainer} />
      <AuthRoute exact path='/login' component={LoginFormContainer} />
      <AuthRoute exact path='/onboarding' component={SignupFormContainer} />
      <ProtectedRoute path={`/users/:id`} component={ProfileContainer} />

    </Switch>
  );
};

export default App;