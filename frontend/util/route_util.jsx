import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact, currentUser }) => {
  
  return (
    <Route path={path} exact={exact} render={(props) => (
      !loggedIn ? (
        <Component {...props} />
      ) : (
          <Redirect to={`/users/${currentUser}`} />
        )
    )} />
  )
};

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
        <Redirect to="/login" />
      )
  )} />
);

const mapStateToProps = state => {
  
  return (
    {
      loggedIn: Boolean(state.session.id),
      currentUser: state.session.id,
    }
  )
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));