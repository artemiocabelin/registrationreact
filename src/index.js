import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import Landing from './components/landing';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <h1>Registration</h1>
      <BrowserRouter>
          <Switch>
            <Route path="/" component={Landing} />
          </Switch>
      </BrowserRouter>
    </div>
  </Provider>
  , document.querySelector('.container'));
