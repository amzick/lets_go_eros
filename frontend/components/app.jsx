import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

//components
import SplashContainer from '../components/splash/splash_container';
import LoginFormContainer from '../components/session_form/login_form_container';
import ProfileContainer from '../components/profile/profile_container';
import WhoAreYouContainer from '../components/session_form/onboarding/who_are_you_container';
import OnboardingContainer from '../components/session_form/onboarding/onboarding_container';
import HomeContainer from '../components/home/home_container';

//Testing
import Logout from '../components/logout/logout';
import SignupFormContainer from './session_form/__signup_form_container';



// todo: change users route to profiles , add components, etc
const App = () => {
  return (
    <Switch>
      <ProtectedRoute exact path='/logout' component={Logout} />
      <AuthRoute exact path="/" component={SplashContainer} />
      <AuthRoute exact path='/login' component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={WhoAreYouContainer} />
      <AuthRoute exact path='/onboarding' component={OnboardingContainer} />
      <ProtectedRoute exact path='/home' component={HomeContainer} />
      <ProtectedRoute exact path='/match' component={HomeContainer} />
      <ProtectedRoute exact path ='/profile' component={ProfileContainer} />
      <ProtectedRoute path={`/profiles/:id`} component={ProfileContainer} />
    </Switch>
  );
};

export default App;