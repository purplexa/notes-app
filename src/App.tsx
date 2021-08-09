import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import CreateNote from './features/notes/CreateNote';
import TabbedPage from './features/notes/TabbedPage';
import ListNotes from './features/notes/ListNotes';
import CreateCategory from './features/notes/CreateCategory';
import EditNote from './features/notes/EditNote';

// TODO: implement category creation
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/category/:category_id/create">
          <TabbedPage>
            <CreateNote />
          </TabbedPage>
        </Route>
        <Route path="/category/:category_id/:id/edit">
          <TabbedPage>
            <EditNote />
          </TabbedPage>
        </Route>
        <Route path="/category/create">
          <TabbedPage>
            <CreateCategory />
          </TabbedPage>
        </Route>
        <Route path="/category/:category_id">
          <TabbedPage>
            <ListNotes />
          </TabbedPage>
        </Route>
        <Route path="/category">
          <TabbedPage>
            <CreateCategory />
          </TabbedPage>
        </Route>
        <Route path="/">
          <Redirect to="/category" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
