import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {Users} from './components/Users'
import {User} from './components/User'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
      <button className="btn btn-primary button__center" onClick={() => window.location='/users'}>Go In</button>
      </Route>
      <Route path='/users' exact component={Users} />
      <Route path='/users/:id' component={User} />

      </Switch>
      </Router>
    </div>
  );
}

export default App;
