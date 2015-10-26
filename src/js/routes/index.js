import { Route, IndexRoute }   from 'react-router';
import React       from 'react';

import CoreLayout  from '../layouts/CoreLayout';
import HomeView    from '../views/HomeView';
import CounterView from '../views/CounterView';
import ChatView    from '../views/ChatView';
import LoginView   from '../views/LoginView';
import LogoutView  from '../views/LogoutView';

function getRoutes({ dispatch, getState }) {
    function requireAuth(nextState, replaceState) {
      const state = getState();

      if (!state.auth.isLoggedIn) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login');
      }
    }

    return (
        <Route path="/" component={CoreLayout}>
          <IndexRoute component={HomeView} />
          
          <Route path="login" component={LoginView} />
          <Route path="logout" component={LogoutView} />

          <Route path="counter" component={CounterView} />
          <Route path="chat" component={ChatView} onEnter={requireAuth} />
        </Route>
    );
}

export default getRoutes;
